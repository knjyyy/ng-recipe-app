import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    recipeAppUrl = 'https://ng-recipe-app-93555-default-rtdb.firebaseio.com/recipes.json';
    recipes: Recipe[] = [];

    constructor(private http: HttpClient, private recipeService: RecipesService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        console.log("DataStorageService.postRecipe()");
        this.http.put<Recipe[]>(this.recipeAppUrl, recipes).subscribe((response) => {
            console.log(response);
        });
    }

    fetchRecipes() {
        console.log('DataStorageService.getRecipes()');
        return this.http.get<Recipe[]>(this.recipeAppUrl)
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                })
            }), tap(recipes => {
                this.recipeService.setRecipes(recipes);
                console.log(recipes);
            }));
    }

}