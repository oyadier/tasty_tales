from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from typing import List
from fastapi.encoders import jsonable_encoder

from models.recipes import Recipe
recipes = [
   {
        '_id': '066de609-b04a-4b30-b46c-32537c7f1f6e',
        'author': 'Robert',
        'res_name': 'Jollof Rice',
        'ingredient': ['rice', 'tomato', 'onion', 'salt'],
        'instruction': ['wash rice', 'Boil the for ', 'add stew'],
        'created_at': '2021-09-12'
    },
   {
        '_id': '066de609-b04a-4b30-b46c-32537c7f1fee',
        'author': 'Eric ',
        'res_name': 'Akara',
        'ingredient': ['Beans', 'Cooking Oil', 'onion'],
        'instruction': ['wash rice', 'cook rice', 'add stew'],
        'created_at': '2021-09-12'
    },
]

router = APIRouter()

'''Creaing a new recipe'''
@router.post('/', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe(request:Request):
    
    return 'recipe'

@router.get('/', response_description='List of all recipes', status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes(request:Request):
    
    return jsonable_encoder(recipes)

@router.get('/recipe/{id}', response_description="Get a recipe by id", status_code=status.HTTP_302_FOUND, response_model=Recipe)
def recipe_by_id(id: str, request:Request):

    return 'Recipe'
@router.put('/recipe/{id}', response_description="Update a recipe by id", status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str):
    
    return 'Recipe'
