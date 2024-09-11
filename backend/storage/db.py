#!/usr/bin/python3
"""A connector to the Mongod Client"""

from pymongo import MongoClient

mongo_url = 'mongod://localhost:27017/'

def isConnected():
    client = MongoClient()
    db = client['tasty_tales']
    return  db
 
                                                      
