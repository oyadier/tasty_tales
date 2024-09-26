
from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from jwt.exceptions import InvalidTokenError
from os import environ
from models.user import User, UserInDB, Token, TokenData
from storage.db import isConnected
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
# to get a string like this run:
# openssl rand -hex 32


#load_dotenv('.env')
SECRET_KEY = "05a32e6cdc0f457b75feee452c61f3feaf10b303d3bb64ed5d88fa22689832ba"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/recipes/auth/sign-in")

db = isConnected()

def verify_password(plain_password, hashed_password):
    """
    Verifies a plain password against a hashed password.

    This function uses the password context to verify that the provided plain
    password matches the hashed password.

    Args:
        plain_password (str): The plain password input by the user.
        hashed_password (str): The hashed password stored in the database.

    Returns:
        bool: True if the passwords match, otherwise False.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    """
    Hashes a password using bcrypt.

    This function takes a plain password and returns its hashed version.

    Args:
        password (str): The plain password to be hashed.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)



def get_user(db, email: str) -> UserInDB:
    """
    Retrieves a user from the database by email.

    This function queries the database to find a user document associated with
    the given email. If found, it returns an instance of UserInDB.

    Args:
        db: The database connection.
        email (str): The email address of the user to retrieve.

    Returns:
        UserInDB | None: The user object if found, otherwise None.
    """
    user_dict = db.find_one({'email': email})
    if user_dict:
        return UserInDB(**user_dict)
    return None

def authenticate_user(email: str, password: str):
    """
    Authenticates a user by verifying the provided email and password.

    This function checks if a user with the specified email exists and verifies
    the password. It returns the user object if authentication is successful,
    otherwise returns False.

    Args:
        email (str): The email address of the user.
        password (str): The password provided by the user.

    Returns:
        UserInDB | bool: The authenticated user object if successful, otherwise False.
    """
    user = get_user(db['users'], email=email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    Creates a JWT access token.

    This function encodes the provided data into a JWT, setting an expiration time
    based on the provided timedelta or defaulting to 15 minutes.

    Args:
        data (dict): The data to encode in the JWT.
        expires_delta (timedelta | None): Optional expiration time.

    Returns:
        str: The encoded JWT access token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """
    Retrieves the current user based on the provided JWT.

    This function decodes the JWT to extract the user email and retrieves the
    corresponding user from the database. If the token is invalid or the user
    does not exist, it raises an HTTPException.

    Args:
        token (Annotated[str, Depends(oauth2_scheme)]): The JWT token from the request.

    Returns:
        User: The current authenticated user.

    Raises:
        HTTPException: If credentials are invalid or user does not exist.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(db["users"], email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """
    Retrieves the current active user.

    This function checks if the current user is disabled. If the user is inactive,
    it raises an HTTPException; otherwise, it returns the current user.

    Args:
        current_user (Annotated[User, Depends(get_current_user)]): The current authenticated user.

    Returns:
        User: The current active user.

    Raises:
        HTTPException: If the user is inactive.
    """
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
