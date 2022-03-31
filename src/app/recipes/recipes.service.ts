import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipeSelected = new Subject<Recipe>();

  constructor (private shoppingListService: ShoppingListService) {}

    recipes: Recipe[] = [
        new Recipe(
          'Silantro Paella',
          'This is a must try paella!',
          'https://scontent.fmnl13-2.fna.fbcdn.net/v/t1.6435-9/40380073_1358719900897724_1062411687388250112_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=RiZI_zTSnmcAX-oYLhU&_nc_ht=scontent.fmnl13-2.fna&oh=00_AT-K0IAHo45oOyXZBAekM4dbuudVg9_zG7yNmGGkfgNNDA&oe=6257D810',
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

    sendToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.saveIngredients(ingredients);
    }  
}