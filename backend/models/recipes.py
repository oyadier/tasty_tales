#!/usr/bin/env python3
'''A Subclass for the base class respeonsible for Recipe'''
from sqlite3 import Blob
from models.base import BaseClass
from pydantic import Field
from PIL import Image
from typing import List
import uuid

class Recipe(BaseClass):
    image_url: bytes = None 
    rep_name: str = Field(..., description="Name of the recipe")
    author: str | None = None
    email: str | None = None
    ingredients: list = Field(..., description="All the required ingredients")
    region: str = Field(..., description="The region of favourite")
    cooking_method: str = Field(..., description="The cooking methods of the recipe")
    preparation_time_minutes: int = Field(..., description="The minutes required for preparation")
    instructions: list = Field(..., description="The instruction to follow to prepare the recipe")
    
    class Config:
        from_attributes = True
        populated_by_name = True
        arbitrary_types_allowed = True
        
        json_schema_extra = {
           'example':{
                "rep_name": "Plain Rice",
                "ingredients": ['Green paper', 'Corn Flour'],
                "region": "South-East Nigeria",
                "cooking_method": "Boiling and Stir-Frying",
                "preparation_time_minutes": 60,
                "instructions": ['Green paper', 'Corn Flour'],
            }
        }

        
class OutputRecipes(Recipe):
    image_url: Image = Field(..., description="Image")
    rep_name: str = Field(..., description="Name of the recipe")
    author: str | None = Field(..., description="The author of the recipe")
    email: str | None = Field(..., description="The email of the author")
    ingredients: list = Field(..., description="All the required ingredients")
    region: str = Field(..., description="The region of favourite")
    cooking_method: str = Field(..., description="The cooking methods of the recipe")
    preparation_time_minutes: int = Field(..., description="The minutes required for preparation")
    instructions: list = Field(..., description="The instruction to follow to prepare the recipe")
        

    
    class Config:
        arbitrary_types_allowed=True
        from_attributes = True
        populated_by_name = True
        
        json_schema_extra = {
           'example':{
               "image_url": "",
               "rep_name": "Plain Rice",
               "author": "John",
                "email": "example@gmail.com",
                
                "ingredients": ['Green paper', 'Corn Flour'],
                "region": "South-East Nigeria",
                "cooking_method": "Boiling and Stir-Frying",
                "preparation_time_minutes": 60,
                "instructions": ['Green paper', 'Corn Flour'],
            }
        }