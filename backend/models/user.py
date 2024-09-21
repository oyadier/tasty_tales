#!/usr/bin/env python3
'''The User module for account creating'''
from models.base import BaseClass
from pydantic import Field
from uuid import uuid4
from pydantic import BaseModel



class User(BaseClass):
    username: str = Field(...)
    other_name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    disabled: bool | None =None
    
    
    class Config():
        from_attributes = True
        populated_by_name = True

        
        json_schema_extra = {
            'example':{
                'username': "John",
                'other_name' : "Dzokoto N.",
                'email': "jj@gmail.com",
                'password': "password",
                'disabled': False,

            }
        }
        
class Token(BaseModel):
    access_token: str
    token_type: str
    
    class Config():
        from_attributes = True
        populated_by_name = True

        
        json_schema_extra = {
            'example':{
                'access_token': 'ei3i4992398400889djuuhhdhehh',
                'token_type' : "bearer",
            }
        }

class TokenData(BaseModel):
    email: str | None = None


class UserInDB(User):
    password: str
        