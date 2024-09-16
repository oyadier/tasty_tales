#1/usr/bin/env python
'''The endpoint of the read and write of Data'''


from fastapi import APIRouter, Body, HTTPException, Request, status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected
from models.recipes import Recipe
from models.user import User
from bson import ObjectId

from pymongo import MongoClient
router = APIRouter()

db = isConnected()


'''Creaing a new recipe'''
@router.post('/new-recipe', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe( recipe: Recipe = Body(...)):
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data provided")
    recipe = jsonable_encoder(recipe)
    
    db['recipes'].insert_one(recipe)
    return db['recipes'].find_one({'_id':recipe['_id']})

'''List all recipes'''
@router.get('/', response_description='List of all recipes',
            status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    all_res = list(db['recipes'].find())
    if all_res is None:
        raise HTTPException(status_code=404, detail="No recipe found")
    return all_res

'''Get a recipe by id'''
@router.get('/recipe/{id}', response_description="Get a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def recipe_by_id(id:str):
    try:
        recipe = db['recipes'].find_one({'_id': ObjectId(id)})
        if recipe:
            recipe['_id'] = str(recipe['_id'])
            document = Recipe(**recipe)
            print("Pinting class name",recipe.__repr__())
            return document
        else:
            raise HTTPException(status_code=404, detail="Recipe not found")
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
        
    

'''Delete a recipe by id'''
@router.put('/recipe/{id}', response_description="Update a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str):
    if type(id) == str:
        raise HTTPException(status_code=400, detail= "Invalid datatype, integer is expected")
#    recipe = db.find({})
    
    return 'Recipe'


@router.post('/user/sign-up', status_code=status.HTTP_200_OK, response_model= int)
def sign_up(user: User=Body(...)):
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



