import datetime
import time
from fastapi import FastAPI
from dotenv import dotenv_values
from routes import router as book_router
from storage.db import isConnected
from routes import create_recipe, list_recipes, sign_up
from models.recipes import Recipe
from models.user import User
from requests import request
from storage.db import isConnected


# config = dotenv_values('.env')
app = FastAPI()
db = isConnected()
recipe = Recipe(
    rep_name= "Jollof Rice",
    author= "Juana Opey",
    ingredients= ["Rice", "Copra Tomatoes", "Black Pepper", "White Onions", "Vegetable oil", "Chicken", "Stock", "Spices"],
    region= "West Africa (Popular in Nigeria)",
    cooking_method= "Stewing",
    preparation_time_minutes= 60,
    instructions= ["1. Blend tomatoes, pepper, and onions to make a paste.", "2. Fry the paste in vegetable oil until the oil separates.", "3. Add chicken stock and spices.", "4. Add rice and cook on low heat until tender.","5. Serve with fried chicken."],
    )

user = User (first_name="Faustina",
             other_name='Tetteh',
             ocpt="Trading")

@app.on_event('startup')
def start_db_client():
    #create_recipe(recipe=recipe)
    list_recipes()
    sign_up(user=user)
    print('Successfully connceted to the database')

    
@app.on_event('shutdown')
def shutdown_db_client():
   close =  db.client.close()
   if close is None:
       print('Shutdown connected')



app.include_router(book_router, tags=['recipe'], prefix='/recipes')
