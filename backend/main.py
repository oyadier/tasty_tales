import datetime
import json
import time
from fastapi import FastAPI
from dotenv import dotenv_values
from routes import router as recipe_router
from storage.db import isConnected
from routes import create_recipe, list_recipes
from models.recipes import Recipe
from models.user import User
from fastapi.encoders import jsonable_encoder



# config = dotenv_values('.env')
app = FastAPI()
recipe = Recipe(
    rep_name= "Jollof Rice",
    author= "Kukwa Suma",
    ingredients= ["Rice", "Tomatoes", "Pepper", "Onions",
                  "Vegetable oil", "Chicken", "Stock", "Spices"],
    region= "West Africa (Popular in Nigeria)",
    cooking_method= "Stewing",
    preparation_time_minutes= 60,
    instructions= ["1. Blend tomatoes, pepper, and onions to make a paste.",
                   "2. Fry the paste in vegetable oil until the oil separates.",
                   "3. Add chicken stock and spices.",
                   "4. Add rice and cook on low heat until tender.",
                   "5. Serve with fried chicken."],
    created_at=str(time.asctime(time.gmtime()))
    )

@app.on_event('startup')
def start_db_client():
    #create_recipe(recipe=recipe)
    print('Successfully connceted to the database')
    
@app.on_event('shutdown')
def shutdown_db_client():
    
    print('Shutdown disconnected')


app.include_router(recipe_router, tags=['recipe'], prefix='/recipes')
