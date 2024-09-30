#!/usr/bin/env python3
'''The endpoint of the read and write of Data'''
from datetime import timedelta
from datetime import timedelta
from fastapi import APIRouter, Body, HTTPException,status
from typing import List
from fastapi.encoders import jsonable_encoder 
from storage.db import recipes_collection, unique_email, users_collection
from models.recipes import Recipe, OutputRecipes
from models.user import Token, User
from util import image_to_bytes, bytes_to_image
from fastapi import Depends
from typing import Annotated
from passlib.context import CryptContext
from token_helper import get_password_hash, authenticate_user,create_access_token, get_current_active_user, EXPIRE_MINUTES
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId

user_email = None
router = APIRouter()
recipe_collect = recipes_collection()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


'''Creaing a new recipe'''
@router.post('/new-recipe', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe(current_user: Annotated[User, Depends(get_current_active_user)], recipe: Recipe = Body(...)):
   
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data provided")
    recipe.author = current_user.first_name
    recipe.email   = current_user.email
    recipe.image_url = image_to_bytes('./plain_rice.jpeg', size=(300,200))
    recipe = jsonable_encoder(recipe)
    
    recipe_collect.insert_one(recipe)
    return recipe_collect.find_one({'id':recipe['id']})

'''List all recipes'''
@router.get('/', response_description='List of all recipes',
            status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    all_res = list(recipe_collect.find())
    if not all_res:
        raise HTTPException(status_code=404, detail="No recipes found")
    for recipe in all_res:
        recipe['_id'] = str(recipe['_id'])  # Convert ObjectId to string
    return all_res

@router.get('/recipe/', response_description="Get a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def recipe_by_id(recipe_id: str):
  
    try:
        
        # Convert recipe_id to ObjectId if needed
        recipe = recipe_collect.find_one({'id': recipe_id})
        
        # If not found, try to find by the `_id` field
        print(recipe)
        
        if recipe:
            return recipe
        else:
            recipe = recipe_collect.find_one({'_id': ObjectId(recipe_id)})
            if recipe:
                return recipe
            else:
                raise HTTPException(status_code=404, detail="Recipe not found")
    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e)) 
    

@router.put('/update/', response_description="Update a recipe by id",
            status_code=status.HTTP_200_OK, response_model=int)
def update_recipe(id: str, current_user: Annotated[User, Depends(get_current_active_user)],
                  recipe: Recipe = Body(...)):
    if current_user is None:
        raise HTTPException(status_code=402, detail="Not Authorized")
    
    new_rep = jsonable_encoder(recipe)

    # Check if the recipe exists before updating
    existing_recipe = recipe_collect.find_one({'id': id})
    if existing_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    new_rep['id'] = existing_recipe['id']
    new_rep['author'] = existing_recipe['author']
    new_rep['email'] = existing_recipe['email']
    new_rep['image_url'] = existing_recipe['image_url']
    
    result = recipe_collect.update_one({'id': id}, update= {'$set': new_rep})
    
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Recipe update failed")
    
    return  result.modified_count



@router.post('/user/sign-up', status_code=status.HTTP_200_OK, response_model=int)
def sign_up(user: User = Body(...)):
    '''Sign up a new user to the system
        Parameters:
            user (object): a new user object
        Return:
            id (int): return id of just added user object'''
    if user is None:
        raise HTTPException(status_code= 400, detail= 'User is none')
    user.password = get_password_hash(user.password)
    user = jsonable_encoder(user)
    try:
        unique_email(users_collection())
        users_collection().insert_one(user).inserted_id
        return status.HTTP_200_OK
    except Exception as e:
        raise HTTPException(status_code=500, detail="Email already exists")
   
# TODO: Implement put and delete methods for user #!6CGyW6$2mHud

@router.get('/users', status_code=status.HTTP_200_OK,
            response_description='List of all users',
            response_model=List[User])
def list_users():
    '''List all users in the system'''
    
    all_users = list(users_collection().find())
    if len(all_users) < 1:
        raise HTTPException(status_code=202,
                            detail="No user found")
    return all_users

'''Get a token for a user'''

@router.post("/auth/sign-in")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(form_data.username, form_data.password)

    if not user and not pwd_context.verify(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    token = Token(access_token=access_token, token_type="bearer")
    return token


@router.get("/users/user", response_model=User)
def get_current_user(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    user = User(id=current_user.id,
                first_name=current_user.first_name,
                last_name=current_user.last_name,
                email=current_user.email,
                created_at=current_user.created_at)
    # user_email = current_user.email
    return user


@router.get("/user/recipes/", status_code=status.HTTP_200_OK, response_model=List[Recipe])
def get_user_recipes(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    final_rep = []
    image = recipe_collect.find({'email': current_user.email})
    for rep in image:
        image_bytes = bytes_to_image(rep['image_url'])
        
        final_rep.append(jsonable_encoder(Recipe(**rep)))
    return final_rep