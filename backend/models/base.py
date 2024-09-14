from pydantic import BaseModel, Field
from uuid import uuid4
import time

class BaseClass(BaseModel):
    
    '''Attributes to be inherited by all subclass'''
    _id: str = Field(default=str(uuid4()), description='The id of object')
    created_at: str = Field(default= str(time.asctime(time.gmtime())), description="Date create the object")
    
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        schema_extra = {
           'example':{
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "rep_name": "Plain Rice",
                "author": "Robert",
                "ingredients": "list['Green paper', 'Conr Flour']",
                "region": "South-East Nigeria",
                "cooking_method": "Boiling and Stir-Frying",
                "preparation_time_minutes": 60,
                "instructions": "list['Green paper', 'Conr Flour']",
                "created_at": '2021-09-12',
            }
        }

    
