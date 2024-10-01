#!/usr/bin/env python3
"""
A Subclass for the base class responsible for managing recipes.

This module defines the Recipe class, which includes attributes and methods necessary
for creating and managing recipes within the application.
"""

from models.base import BaseClass
from pydantic import Field
from PIL import Image
from typing import List

class Recipe(BaseClass):
    """
    Represents a culinary recipe.

    This class defines the attributes necessary for a recipe, including its name,
    author, email of the author, list of ingredients, region of origin, cooking method,
    preparation time, and instructions for cooking.

    Attributes:
        rep_name (str): The name of the recipe.
        author (str | None): The name of the author of the recipe. Defaults to None.
        email (str | None): The email address of the author. Defaults to None.
        ingredients (list): A list of all required ingredients for the recipe.
        region (str): The region associated with the recipe's cuisine.
        cooking_method (str): The method used to cook the recipe.
        preparation_time_minutes (int): The time required for preparation in minutes.
        instructions (list): Step-by-step instructions for preparing the recipe.

    Examples:
        >>> recipe = Recipe(
        ...     rep_name="Plain Rice",
        ...     author="John Doe",
        ...     email="john.doe@example.com",
        ...     ingredients=["Rice", "Water", "Salt"],
        ...     region="South-East Nigeria",
        ...     cooking_method="Boiling",
        ...     preparation_time_minutes=30,
        ...     instructions=["Rinse the rice", "Boil the water", "Add the rice"]
        ... )
        >>> print(recipe.rep_name)  # Outputs: Plain Rice
    """
    rep_name: str = Field(..., description="Name of the recipe")
    author: str | None = None
    email: str | None = None
    ingredients: list = Field(..., description="All the required ingredients")
    region: str = Field(..., description="The region of favourite")
    cooking_method: str = Field(..., description="The cooking methods of the recipe")
    preparation_time_minutes: int = Field(..., description="The minutes required for preparation")
    instructions: list = Field(..., description="The instruction to follow to prepare the recipe")
    
    class Config:
        """
        Configuration options for the Recipe model.

        Attributes:
            from_attributes (bool): Allows the model to be populated from attributes.
            populated_by_name (bool): Enables population of fields by name.
            json_schema_extra (dict): Provides additional schema examples for API documentation.
        """
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