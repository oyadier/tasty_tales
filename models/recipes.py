#!/usr/bin/env python3
'''A Subclass for the base class respeonsible for Recipe'''
from models.base import BaseClass
from sqlalchemy import String, Integer
import uuid
from sqlalchemy.orm import mapped_column, Mapped

class Recipe:
    
    def __init__(self,author: str, res_name: str, instruct: list, ingredient: list, created_at: str) -> None:
        __tablename__ = "recipies"
        self.id = mapped_column(str(uuid.uuid4()), primary_key=True, autoincrement=True)
        self.author = mapped_column(String(150), nullable=False)
        self.res_name = map