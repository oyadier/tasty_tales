#1/usr/bin/env python
'''The endpoint of the read and write of Data'''


from datetime import timedelta
from fastapi import APIRouter, Body, HTTPException, Request, status
from typing import List
from fastapi.encoders import jsonable_encoder
from storage.db import isConnected
from models.recipes import Recipe
from models.user import Token, User
from bson import ObjectId
from fastapi import Depends
from typing import Annotated
from auth_route import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token, get_current_active_user, get_password_hash, verify_password
from passlib.context import CryptContext



from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


router = APIRouter()

auth = OAuth2PasswordBearer(tokenUrl="token")


db = isConnected()


'''Creaing a new recipe'''
@router.post('/new-recipe', response_description="Create a new recipe", status_code=status.HTTP_201_CREATED, response_model=Recipe)
def create_recipe( recipe: Recipe = Body(...)):
    if recipe is None:
        raise HTTPException(status_code=400, detail="Invalid recipe data provided")
    recipe = jsonable_encoder(recipe)
    
    db['recipes'].insert_one(recipe)
    return db['recipes'].find_one({'_id':recipe['_id']})

'''List all recipes'''
@router.get('/', response_description='List of all recipes',
            status_code=status.HTTP_200_OK, response_model=List[Recipe])
def list_recipes():
    all_res = list(db['recipes'].find())
    if all_res is None:
        raise HTTPException(status_code=404, detail="No recipe found")
    return all_res

'''Get a recipe by id'''
@router.get('/recipe/{id}', response_description="Get a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def recipe_by_id(id:str):
    try:
        recipe = db['recipes'].find_one({'id': ObjectId(id)})
        if recipe:
            recipe['id'] = str(recipe['id'])
            document = Recipe(**recipe)
            print("Pinting class name",recipe.__repr__())
            return document
        else:
            raise HTTPException(status_code=404, detail="Recipe not found")
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
        
    

'''Delete a recipe by id'''
@router.put('/recipe/{id}', response_description="Update a recipe by id",
            status_code=status.HTTP_200_OK, response_model=Recipe)
def update_recipe(id: str):
    if type(id) == str:
        raise HTTPException(status_code=400, detail= "Invalid datatype, integer is expected")
#    recipe = db.find({})
    
    return 'Recipe'


@router.post('/user/sign-up', status_code=status.HTTP_200_OK, response_model= int)
def sign_up(user: User=Body(...)):
    '''Sign up a new user to the sytem
        Parameters:
            user (object): a new user object
        Return:
            id (int): return id of just added user object'''
    if user is None:
        raise HTTPException(status_code= 400, detail= 'User is none')
    user.password = get_password_hash(user.password)
    user = jsonable_encoder(user)
    db['users'].insert_one(user).inserted_id
    return status.HTTP_200_OK


@router.post('/user/login', status_code=status.HTTP_200_OK, response_model= User)
def login(email: str, password: str):
    '''Login a user to the system
        Parameters:
            user (object): a user object
        Return:
            token (str): return token of just added user object'''
    if email is None or password is None:
        raise HTTPException(status_code= 400, detail= 'Username or password is none')
    user = db['users'].find_one({'email': email})
    if user is None:
        raise HTTPException(status_code= 404, detail= 'User not found')
    pwd = verify_password(password, user['password'])
    if pwd:
        user['id'] = user['id']
        found_user = User(**user)
        return found_user
    raise HTTPException(status_code= 404, detail= 'Invalid password')
    

@router.get('/users', status_code=status.HTTP_200_OK, response_description='List of all users', response_model=List[User])
def list_users():
    '''List all users in the system'''
    return list(db['users'].find())
    # all_users = db['users'].find()
    # if all_users is None:
    #     raise HTTPException(status_code=404, detail="No user found")
    # return all_users


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    print(form_data.username)
    user = authenticate_user(db, form_data.username, form_data.password)
    print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]