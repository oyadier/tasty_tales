#!/usr/bin/python3
"""A connector to the Mongod Client"""


from pymongo import ASCENDING, MongoClient, errors

mongo_url = 'mongod://localhost:27017/'

def isConnected():
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
        