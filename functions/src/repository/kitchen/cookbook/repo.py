from bson.objectid import ObjectId

import src.repository.kitchen.cookbook.models as m
from src.database.mongo import mongo_db


class _CollectionName:
    RECIPE = 'recipe'


class CookbookRepository:
    def __init__(self):
        self._db = mongo_db('kitchen')

    def add_recipe(self, recipe: m.ninja.CreateRecipe):
        collection = self._db[_CollectionName.RECIPE]

        match type(recipe):
            case m.ninja.CreateRecipe:
                return collection.insert_one(recipe.to_dict()).inserted_id
            case _:
                raise TypeError(f"Invalid recipe type: {type(recipe)}({recipe})")

    def get_recipe_by_id(self, recipe_id: str | ObjectId):
        """Gets recipe"""
        if isinstance(recipe_id, str):
            recipe_id = ObjectId(recipe_id)
        elif not isinstance(recipe_id, ObjectId):
            raise TypeError('recipe_id must be a string or ObjectId')

        return self._db[_CollectionName.RECIPE].find_one({'_id': recipe_id})

    def get_recipes(self):
        """Gets the name and source for all the recipes"""
        return self._db[_CollectionName.RECIPE].find({}, {'name': 1, 'source': 1})
