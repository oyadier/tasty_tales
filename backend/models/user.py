#!/usr/bin/env python3
"""
The User module for account creation and management.

This module defines the User class, along with related classes for handling user authentication tokens.
"""
from models.base import BaseClass
from pydantic import Field
from uuid import uuid4
from pydantic import BaseModel



class User(BaseClass):
    """
    Represents a user account in the system.

    This class defines the attributes necessary for creating a user account, including 
    a username, other name, email, password, and a flag indicating whether the user account is disabled.

    Attributes:
        username (str): The unique username of the user.
        other_name (str): The full name or additional name of the user.
        email (str): The email address of the user, must be unique.
        password (str): The password for the user account, stored in a hashed format.
        disabled (bool | None): A flag indicating whether the user account is disabled. Defaults to None.

    Examples:
        >>> user = User(username="JohnDoe", other_name="John Doe", email="john@example.com", password="securepassword")
        >>> print(user.username)  # Outputs: JohnDoe
    """
    username: str = Field(...)
    other_name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    disabled: bool | None =None
    
    
    class Config():
        """
        Configuration options for the User model.

        Attributes:
            from_attributes (bool): Allows the model to be populated from attributes.
            populated_by_name (bool): Enables population of fields by name.
            json_schema_extra (dict): Provides additional schema examples for API documentation.
        """
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
    """
    Represents an authentication token issued to a user.

    This class contains the access token and the type of token (e.g., bearer).

    Attributes:
        access_token (str): The token used for authentication.
        token_type (str): The type of token (e.g., bearer).

    Examples:
        >>> token = Token(access_token="abc123", token_type="bearer")
        >>> print(token.access_token)  # Outputs: abc123
    """
    access_token: str
    token_type: str
    
    class Config():
        """
        Configuration options for the Token model.

        Attributes:
            from_attributes (bool): Allows the model to be populated from attributes.
            populated_by_name (bool): Enables population of fields by name.
            json_schema_extra (dict): Provides additional schema examples for API documentation.
        """
        from_attributes = True
        populated_by_name = True

        
        json_schema_extra = {
            'example':{
                'access_token': 'ei3i4992398400889djuuhhdhehh',
                'token_type' : "bearer",
            }
        }

class TokenData(BaseModel):
    """
    Represents the data contained in a token.

    This class is used to extract information from a token, such as the email of the user.

    Attributes:
        email (str | None): The email address associated with the token, if available.
    """
    email: str | None = None


class UserInDB(User):
    """
    Represents a user account stored in the database.

    This class extends the User class by adding the password attribute to ensure
    the password is included when interacting with the database.

    Attributes:
        password (str): The hashed password of the user, required for database storage.
    """
    password: str
        
