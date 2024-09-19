#!/usr/bin/env python
'''The endpoint of the read and write of Data'''

from fastapi import APIRouter, Body, HTTPException, status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected
from models.recipes import Recipe
from models.user import User
from bson import ObjectId
from pymongo import MongoClient

router = APIRouter()

# Ensure the database connection is set up correctly
db = isConnected()

'''Creating a new recipe'''
@router.post('/new-recipe', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe(recipe: Recipe = Body(...)):
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data provided")
    recipe = jsonable_encoder(recipe)
    result = db['recipes'].insert_one(recipe)
    created_recipe = db['recipes'].find_one({'_id': result.inserted_id})
    return created_recipe

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
        recipe = db['recipes'].find_one({'_id': ObjectId(id)})
        if recipe:
            recipe['_id'] = str(recipe['_id'])  # Convert ObjectId to string
            return Recipe(**recipe)
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
        raise HTTPException(status_code=400, detail='User is none')
    user = jsonable_encoder(user)
    result = db['users'].insert_one(user)
    return result.inserted_id

