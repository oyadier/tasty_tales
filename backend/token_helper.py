
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
    auth = pwd_context.verify(plain_password, hashed_password)
    if not auth:
        print("Wrong password User")
    return auth


def get_password_hash(password):
    return pwd_context.hash(password)



def get_user(db, email: str) -> UserInDB:

    user_dict = db.find_one({'email': email})
    if user_dict :
        user_dict['disabled ']= False
        return UserInDB(**user_dict)
    return {"User": "No User in DB"}

def authenticate_user(email: str, password: str):
    user = get_user(db['users'], email=email)
    if not user:
        print("Not exist User:", user.disabled)
        return False
    if not verify_password(password, user.password):
        print("Wrong password User:", user.disabled)
        return False
    user.disabled = False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
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
    user.disabled = False
    print("Currrent User:", user.disabled)
    
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        print("Inactive User:", current_user.disabled)
        raise HTTPException(status_code=400, detail="Inactive user")
    print("Currrent User:", current_user.disabled)
    return current_user

"I can create and perform all crud. I have to test it with postman"