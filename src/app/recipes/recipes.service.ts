import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor (private shoppingListService: ShoppingListService) {}

    recipes: Recipe[] = [
        new Recipe(
          'Silantro Paella',
          'This is a must try paella!',
          'https://s3.ap-southeast-1.amazonaws.com/thetravelinsider-20190624/insiders-recommendations/March2018/dDtB0JdcMw99BqyXYNvW.jpg',
          [new Ingredient('Seafood', 10), new Ingredient('Rice', 10)]
        ), new Recipe(
          'Silantro Quesadilla',
          'Very cheesy, and affordable!',
          'https://farm4.staticflickr.com/3808/8937653743_9c09e6f2df_z.jpg',
          [new Ingredient('Mozarella Cheese', 5), new Ingredient('Fries', 5)]
        )
      ];

      getRecipes() {
        return this.recipes.slice();
      }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    sendToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.saveIngredients(ingredients);
    }  

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.refreshRecipeList();
    }

    editRecipe(index: number, recipe: Recipe) {
      this.recipes[index] = recipe;
      this.refreshRecipeList();
    }

    deleteRecipe(index:number) {
      this.recipes.splice(index, 1);
      this.refreshRecipeList();
    }

    refreshRecipeList() {
      this.recipesChanged.next(this.recipes.slice());
    }
}