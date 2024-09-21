#!/usr/bin/env python3
'''The User module for account creating'''
from models.base import BaseClass
from pydantic import Field
from uuid import uuid4
from pydantic import BaseModel



class User(BaseClass):
    first_name: str = Field(...)
    last_name: str = Field(...)
    email: str = Field(...)
    password: str | None = None
    disabled: bool = False
    
    
    class Config():
        from_attributes = True
        populated_by_name = True

        
        json_schema_extra = {
            'example':{
                'first_name': "John",
                'last_name' : "Dzokoto N.",
                'email': "jj@gmail.com",
                'password': "password"
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
        
       # 13.60.67.58