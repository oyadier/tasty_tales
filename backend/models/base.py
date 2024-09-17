from pydantic import BaseModel, Field
from uuid import uuid4
import time

class BaseClass(BaseModel):
    
    '''Attributes to be inherited by all subclass'''
    id: str = Field(default=str(uuid4()), description='The id of object')
    created_at: str = Field(default= str(time.asctime(time.gmtime())), description="Date create the object")
