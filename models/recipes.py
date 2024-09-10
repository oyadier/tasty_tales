#!/usr/bin/env python3
'''A Subclass for the base class respeonsible for Recipe'''
from models.base import BaseClass
from pydantic import Field
from typing import List
import uuid

class Recipe(BaseClass):
    _id:str = Field(default_factory=str(uuid.uuid4()), alias='_id')
    author: str = Field(...)
    res_name: str = Field(...)
    instruction: list = Field()
    ingredient: list = Field(...)
    created_at: str = Field(...)
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "author": "Robet",
                "res_name": "Plain Rice",
                "instructions": "list['Green paper', 'Conr Flour',...]",
                "ingredient": "list['Green paper', 'Conr Flour',...]",
                'created_at': '2021-09-12',
            }
        }
         
