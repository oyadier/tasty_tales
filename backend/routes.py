#1/usr/bin/env python
'''The endpoint of the read and write of Data'''


from fastapi import APIRouter, Body, HTTPException, status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected
from models.recipes import Recipe
from models.user import User

from pymongo import MongoClient
router = APIRouter()

db = isConnected()


'''Creaing a new recipe'''
@router.post('/', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe( recipe: Recipe = Body(...)):
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data    ")
    recipe = jsonable_encoder(recipe)
    
    db['recipes'].insert_one(recipe)
    return db['recipes'].find_one({'_id':recipe['_id']})

'''List all recipes'''
@router.get('/', response_description='List of all recipes', status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    
    return list(db['recipes'].find().limit(1-15))
'''Get a recipe by id'''
@router.get('/recipe/{id}', response_description="Get a recipe by id", status_code=status.HTTP_302_FOUND, response_model=Recipe)
def recipe_by_id(id: str):
    if type(id) == int:
        raise HTTPException(status_code=400, detail= "Invalid datatype, integer is expected")
    recipe = db['recipes'].find({'author': id})
    return list(recipe)

'''Delete a recipe by id'''
@router.put('/recipe/{id}', response_description="Update a recipe by id", status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str):
    if type(id) == str:
        raise HTTPException(status_code=400, detail= "Invalid datatype, integer is expected")
#    recipe = db.find({})
    
    return 'Recipe'


@router.put('/auth/sign-up', status_code=status.HTTP_200_OK, response_model= int)
def sign_up(user: User):
    '''Sign up a new user to the sytem
        Parameters:
            user (object): a new user object
        Return:
            id (int): return id of just added user object'''
    if user is None:
        raise HTTPException(status_code= 400, detail= 'User is none')
    user = jsonable_encoder(user)
    db['users'].insert_one(user).inserted_id
    return status.HTTP_200_OK

