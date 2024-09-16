#!/usr/bin/env python3
'''The Authentication credentials of the user module for account creating'''
from models.base import BaseClass
from pydantic import Field

class Creadentials(BaseClass):
    email: str = Field(ge=10, description="The user email")
    password: str = Field(gt= 7, description="The user password")
    
    
    class Config():
        orm_module = True
        allow_population_by_field_name =True
        
        scheme_extra = {
            'example':{
                'email': "mike@gmail.com",
                'password' : "password",
            }
        }