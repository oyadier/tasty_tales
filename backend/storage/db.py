#!/usr/bin/python3
"""
A connector to the MongoDB Client.

This module provides functionality to connect to a MongoDB database,
specifically targeting the 'tasty_tales' database. It includes functions to
establish a connection and check the status of that connection.
"""

from pymongo import ASCENDING, MongoClient, errors

mongo_url = 'mongod://localhost:27017/'

def isConnected():
    """
    Establishes a connection to the MongoDB database and returns the database object.

    This function creates a MongoDB client, connects to the 'tasty_tales' database,
    and returns the database object for further operations. If the connection fails,
    it raises an exception.

    Returns:
        db (Database): The database object for 'tasty_tales'.

    Raises:
        Exception: If the connection to the MongoDB server fails.

    Example:
        >>> db = isConnected()
        >>> print(db.name)  # Outputs: tasty_tales
    """
    client = MongoClient()
    db = client['tasty_tales']
    return  db


def recipes_collection():
    db = isConnected()
    return db['recipes']

def users_collection():
    db = isConnected()
    return db['users']


def unique_email(collection):
    try:
        collection.create_index([('email', ASCENDING)], unique=True)
        
    except errors.InvalidOperation as e:
        raise f"Email already exists:" + str(e)
        