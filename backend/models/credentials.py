#!/usr/bin/env python3
"""
The Authentication credentials module for user account creation.

This module defines the Credentials class, which encapsulates the authentication
credentials required for user account creation, including the user's email and password.
"""

from models.base import BaseClass
from pydantic import Field

class Creadentials(BaseClass):
    """
    Represents user authentication credentials.

    This class is used to validate and manage the email and password
    associated with a user account. The email must meet a minimum length requirement,
    and the password must be sufficiently secure.

    Attributes:
        email (str): The user's email address, must be at least 10 characters long.
        password (str): The user's password, must be greater than 7 characters long.

    Examples:
        >>> credentials = Credentials(
        ...     email="mike@gmail.com",
        ...     password="securepassword"
        ... )
        >>> print(credentials.email)  # Outputs: mike@gmail.com
    """
    email: str = Field(ge=10, description="The user email")
    password: str = Field(gt= 7, description="The user password")
    
    
    class Config():
        """
        Configuration options for the Credentials model.

        Attributes:
            from_attributes (bool): If True, allows the model to be populated from attributes.
            populated_by_name (bool): If True, enables population of fields by their names.
            json_schema_extra (dict): Provides additional schema examples for API documentation.
        """
        from_attributes = True
        populated_by_name = True
        
        json_schema_extra = {
            'example':{
                'email': "mike@gmail.com",
                'password' : "password",
            }
        }
