from pydantic import BaseModel, Field
from uuid import uuid4
import time

class BaseClass(BaseModel):
    """
    BaseClass serves as a foundation for all models in the application.

    This class provides common attributes that can be inherited by all subclasses,
    ensuring that every object has a unique identifier and a creation timestamp.

    Attributes:
        id (str): A unique identifier for the object, automatically generated using UUID4.
        created_at (str): A timestamp indicating when the object was created, formatted as a string.

    Example:
        >>> instance = BaseClass()
        >>> print(instance.id)  # Outputs a unique UUID
        >>> print(instance.created_at)  # Outputs the creation time in string format
    """    
    id: str = Field(default=str(uuid4()), description='The id of object')
    created_at: str = Field(default= str(time.asctime(time.gmtime())), description="Date create the object")
