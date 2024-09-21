#!/usr/bin/env python
'''The endpoint of the read and write of Data'''

from datetime import timedelta
from datetime import timedelta
from bson import ObjectId
from fastapi import APIRouter, Body, HTTPException,status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected
from models.recipes import Recipe
from models.user import Token, User
from fastapi import Depends
from typing import Annotated
from passlib.context import CryptContext
from token_helper import get_password_hash, authenticate_user,create_access_token, get_current_active_user, EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



db = isConnected()


'''Creaing a new recipe'''
@router.post('/new-recipe', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe(current_user: Annotated[User, Depends(get_current_active_user)], recipe: Recipe = Body(...)):
   
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data provided")
    recipe.author = current_user.first_name
    recipe.email   = current_user.email
    recipe = jsonable_encoder(recipe)
    
    db['recipes'].insert_one(recipe)
    return db['recipes'].find_one({'id':recipe['id']})

'''List all recipes'''
@router.get('/', response_description='List of all recipes',
            status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    all_res = list(db['recipes'].find())
    if not all_res:
        raise HTTPException(status_code=404, detail="No recipes found")
    for recipe in all_res:
        recipe['_id'] = str(recipe['_id'])  # Convert ObjectId to string
    return all_res

'''Get a recipe by id'''
@router.get('/recipe/{id}', response_description="Get a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def recipe_by_id(id: str):
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

'''Update a recipe by id'''
@router.put('/recipe/{id}', response_description="Update a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str, recipe: Recipe = Body(...)):
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
    '''Sign up a new user to the system
        Parameters:
            user (object): a new user object
        Return:
            id (int): return id of just added user object'''
    if user is None:
        raise HTTPException(status_code= 400, detail= 'User is none')
    user.password = get_password_hash(user.password)
    user = jsonable_encoder(user)
    db['users'].insert_one(user).inserted_id
    return status.HTTP_200_OK


@router.get('/users', status_code=status.HTTP_200_OK,
            response_description='List of all users',
            response_model=List[User])
def list_users():
    '''List all users in the system'''
    
    all_users = list(db['users'].find())
    if len(all_users) < 1:
        raise HTTPException(status_code=202,
                            detail="No user found")
    return all_users



'''Get a token for a user'''

@router.post("/auth/sign-in")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
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
    user = User(id=current_user.id,
                first_name=current_user.first_name,
                last_name=current_user.last_name,
                email=current_user.email,
                created_at=current_user.created_at)
    return user


@router.get("/user/recipes/", status_code=status.HTTP_200_OK, response_model=List[Recipe])
def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return list(db['recipes'].find({'email': current_user.email}))