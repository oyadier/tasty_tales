# Description: This file contains the main FastAPI application that serves as the entry point for the backend server.
import time
from fastapi import FastAPI

from routes import router as recipe_router
from storage.db import isConnected
from routes import create_recipe, list_recipes

from fastapi.middleware.cors import CORSMiddleware


origins = ["*"]

app = FastAPI()

# All cross-origin requests are allowed
app.add_middleware(CORSMiddleware,
               allow_origins=origins,
               allow_credentials=True,
               allow_methods=["*"],
               allow_headers=["*"]) 


app.include_router(recipe_router, tags=['recipe'], prefix='/recipes')
