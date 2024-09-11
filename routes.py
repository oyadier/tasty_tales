from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected

from models.recipes import Recipe

import pymongo
from pymongo import MongoClient
router = APIRouter()



collections = isConnected()
'''Creaing a new recipe'''
@router.post('/', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe( recipe: Recipe = Body(...)):
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data    ")
    recipe = jsonable_encoder(recipe)
    collections.insert_one(recipe)
    return collections.find_one(recipe).limit(1).sort({'_id':recipe['_id']})

'''List all recipes'''
@router.get('/', response_description='List of all recipes', status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    
    return list(collections.find().limit(1-15))
'''Get a recipe by id'''
@router.get('/recipe/{id}', response_description="Get a recipe by id", status_code=status.HTTP_302_FOUND, response_model=Recipe)
def recipe_by_id(id: str, request:Request):

    return 'Recipe'

'''Delete a recipe by id'''
@router.put('/recipe/{id}', response_description="Update a recipe by id", status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str):
    
    return 'Recipe'
