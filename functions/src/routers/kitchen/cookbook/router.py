from fastapi import APIRouter, Depends, HTTPException, status

import src.repository.kitchen.cookbook.models as m
from src.repository.kitchen.cookbook.repo import CookbookRepository

router = APIRouter(prefix="/kitchen/cookbook", tags=["Ninja Cookbook"])


@router.get('/recipe')
def get_all_recipes(repo: CookbookRepository = Depends()):
    return repo.get_recipes()


@router.get('/recipe/{recipe_id}')
def get_recipe_by_id(recipe_id: str, repo: CookbookRepository = Depends()):
    return repo.get_recipe_by_id(recipe_id)



@router.post('/recipe')
def add_recipe(recipe: m.ninja.CreateRecipe,
               repo: CookbookRepository = Depends()):
    pass
