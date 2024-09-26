#!/usr/bin/env python
"""
This module defines the API endpoints for reading and writing data, such as creating, listing,
updating recipes, and user registration, using FastAPI and MongoDB for the storage backend.
"""

from datetime import datetime, timedelta, timezone
from datetime import timedelta
from fastapi import APIRouter, Body, HTTPException, Request, status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected
from models.recipes import Recipe
from models.user import Token, User, UserInDB, TokenData
from jwt.exceptions import InvalidTokenError
import jwt
from bson import ObjectId
from fastapi import Depends
from typing import Annotated
from passlib.context import CryptContext
from token_helper import get_password_hash, authenticate_user, create_access_token, get_current_active_user, EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



db = isConnected()

@router.post('/new-recipe', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe(current_user: Annotated[User, Depends(get_current_active_user)], recipe: Recipe = Body(...)):
    """
    Create a new recipe in the database.

    Parameters:
    -----------
    recipe : Recipe
        A JSON object representing the recipe to be created.

    Returns:
    --------
    Recipe
        The newly created recipe.

    Raises:
    -------
    HTTPException:
        - 400: If the recipe data is invalid or missing.
    """   
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data provided")
    recipe.author = current_user.username
    recipe.email   = current_user.email
    recipe = jsonable_encoder(recipe)
    
    db['recipes'].insert_one(recipe)
    return db['recipes'].find_one({'id':recipe['id']})


@router.get('/', response_description='List of all recipes',
            status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    """
    Retrieve a list of all recipes from the database.

    Returns:
    --------
    List[Recipe]
        A list of all recipes available in the database.

    Raises:
    -------
    HTTPException:
        - 404: If no recipes are found.
    """
    all_res = list(db['recipes'].find())
    if not all_res:
        raise HTTPException(status_code=404, detail="No recipes found")
    for recipe in all_res:
        recipe['_id'] = str(recipe['_id'])  # Convert ObjectId to string
    return all_res

@router.get('/recipe/{id}', response_description="Get a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def recipe_by_id(id: str):
    """
    Retrieve a single recipe by its unique ID.

    Parameters:
    -----------
    id : str
        The ID of the recipe to be retrieved.

    Returns:
    --------
    Recipe
        The recipe corresponding to the given ID.

    Raises:
    -------
    HTTPException:
        - 404: If the recipe is not found or the ID is invalid.
    """
    try:
        recipe = db['recipes'].find_one({'id': id})
        if recipe:
            recipe['id'] = str(recipe['id'])
            document = Recipe(**recipe)

            return document
        else:
            raise HTTPException(status_code=404, detail="Recipe not found")
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put('/recipe/{id}', response_description="Update a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str, recipe: Recipe = Body(...)):
    """
    Update an existing recipe in the database by its ID.

    Parameters:
    -----------
    id : str
        The ID of the recipe to be updated.
    recipe : Recipe
        A JSON object representing the updated recipe data.

    Returns:
    --------
    Recipe
        The updated recipe object.

    Raises:
    -------
    HTTPException:
        - 400: If the provided ID is invalid.
        - 404: If the recipe with the given ID is not found.
    """
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    recipe = jsonable_encoder(recipe)
    update_result = db['recipes'].update_one({'_id': ObjectId(id)}, {'$set': recipe})
    
    if update_result.matched_count:
        updated_recipe = db['recipes'].find_one({'_id': ObjectId(id)})
        return Recipe(**updated_recipe)
    else:
        raise HTTPException(status_code=404, detail="Recipe not found")

@router.post('/user/sign-up', status_code=status.HTTP_200_OK, response_model=int)
def sign_up(user: User = Body(...)):
    """
    Register a new user in the system.

    Parameters:
    -----------
    user : User
        A JSON object representing the new user's details, including username, email, and password.

    Returns:
    --------
    int
        The HTTP status code indicating the success of the operation (200 OK).

    Raises:
    -------
    HTTPException:
        - 400: If the user data is None or invalid.
    """    
    if user is None:
        raise HTTPException(status_code= 400, detail= 'User is none')
    user.password = get_password_hash(user.password)
    user = jsonable_encoder(user)
    db['users'].insert_one(user).inserted_id
    return status.HTTP_200_OK


@router.get('/users', status_code=status.HTTP_200_OK, response_description='List of all users', response_model=List[User])
def list_users():
    """
    List all users in the system.

    Returns:
    --------
    List[User]
        A list of all registered users in the system.
    """    
    return list(db['users'].find())
    # all_users = db['users'].find()
    # if all_users is None:
    #     raise HTTPException(status_code=404, detail="No user found")
    # return all_users




@router.post("/auth/sign-in")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """
    Authenticate a user and provide a JWT access token.

    Parameters:
    -----------
    form_data : OAuth2PasswordRequestForm
        Contains the form data submitted by the user, including username and password.

    Returns:
    --------
    Token
        A JSON object containing the access token and its type.

    Raises:
    -------
    HTTPException:
        - 401: If the username or password is incorrect.
    """
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/user", response_model=User)
def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    """
    Retrieve the currently authenticated user's profile.

    Parameters:
    -----------
    current_user : User
        The currently authenticated user, retrieved through OAuth2 dependency.

    Returns:
    --------
    User
        The authenticated user's profile information.
    """
    return current_user


@router.get("/user/recipes/", status_code=status.HTTP_200_OK, response_model=List[Recipe])
def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    """
    Retrieve all recipes created by the currently authenticated user.

    Parameters:
    -----------
    current_user : User
        The currently authenticated user, retrieved through OAuth2 dependency.

    Returns:
    --------
    List[Recipe]
        A list of recipes created by the authenticated user.
    """
    return list(db['recipes'].find({'email': current_user.email}))
