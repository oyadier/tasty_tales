#!/usr/bin/env python3
'''The User module for account creating'''
from models.base import BaseClass
from pydantic import Field
from uuid import uuid4



class User(BaseClass):
    first_name: str = Field(...)
    other_name: str = Field(...)
    
    
    class Config():
        from_attributes = True
        populated_by_name = True
        
        json_schema_extra = {
            'example':{
                '_id': "994uuru3uei8847uweyueu",
                'first_name': "John",
                'other_name' : "Dzokoto N.",
                'created_at': 'Tue 02 12:33:23 2024'
            }
        }
        