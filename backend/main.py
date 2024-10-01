#!/usr/bin/env python3
import time
from fastapi import FastAPI
from routes import router as recipe_router
from storage.db import isConnected
from routes import create_recipe, list_recipes
from fastapi.middleware.cors import CORSMiddleware

# List of allowed origins for CORS
origins = ["*"]

# Create an instance of FastAPI
app = FastAPI()

# Configure CORS middleware to allow cross-origin requests
app.add_middleware(CORSMiddleware,
               allow_origins=origins,
               allow_credentials=True,
               allow_methods=["*"],
               allow_headers=["*"]) 


# Include the recipe router with a specified prefix and tags
app.include_router(recipe_router, tags=['recipe'], prefix='/recipes')