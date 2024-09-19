#!/usr/bin/env python3
'''The User module for account creating'''
from models.base import BaseClass
from pydantic import Field
from uuid import uuid4



class User(BaseClass):
    username: str = Field(...)
    other_name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    disabled: bool = Field(..., description="Check if the user is active or not")
    
    
    class Config():
        from_attributes = True
        populated_by_name = True

        
        json_schema_extra = {
            'example':{
                'id': "994uuru3uei8847uweyueu",
                'username': "John",
                'other_name' : "Dzokoto N.",
                'email': "jj@gmail.com",
                'password': "password",
                'disabled': False,
                'created_at': 'Tue 02 12:33:23 2024'
            }
        }
        
class Token(BaseClass):
    access_token: str
    token_type: str
    
    class Config():
        from_attributes = True
        populated_by_name = True

        
        json_schema_extra = {
            'example':{
                'id': "994uuru3uei8847uweyueu",
                'access_token': 'ei3i4992398400889djuuhhdhehh',
                'token_type' : "bearer",
                'created_at': 'Tue 02 12:33:23 2024'
            }
        }


class TokenData(BaseClass):
    username: str | None = None


class UserInDB(User):
    password: str
        