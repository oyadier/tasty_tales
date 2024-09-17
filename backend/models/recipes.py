#!/usr/bin/env python3
'''A Subclass for the base class respeonsible for Recipe'''
from models.base import BaseClass
from pydantic import Field
from typing import List
import uuid

class Recipe(BaseClass):
    rep_name: str = Field(..., description="Name of the recipe")
    author: str = Field(..., description="The the inventor of the recipe")
    ingredients: list = Field(..., description="All the required ingredients")
    region: str = Field(..., description="The region of favourite")
    cooking_method: str = Field(..., description="The cooking methods of the recipe")
    preparation_time_minutes: int = Field(..., description="The minutes required for preparation")
    instructions: list = Field(..., description="The instruction to follow to prepare the recipe")
    
    class Config:
        from_attributes = True
        populated_by_name = True
        
        json_schema_extra = {
           'example':{
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "rep_name": "Plain Rice",
                "author": "Robert",
                "ingredients": ['Green paper', 'Corn Flour'],
                "region": "South-East Nigeria",
                "cooking_method": "Boiling and Stir-Frying",
                "preparation_time_minutes": 60,
                "instructions": ['Green paper', 'Corn Flour'],
                "created_at": '2021-09-12',
            }
        }
