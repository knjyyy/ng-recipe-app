import { Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService  {
    ingredientsUpdated = new Subject<Ingredient[]>();
    currentIngredient = new Subject<number>();
    ingredients: Ingredient[] = [new Ingredient('Cheese', 12), new Ingredient('Fries', 19)];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    saveIngredient(saveIngredient: Ingredient) {
        this.ingredients.push(saveIngredient);
        this.emitNewIngredients();
    }

    saveIngredients(saveIngredients: Ingredient[]) {
        this.ingredients.push(...saveIngredients);
        this.emitNewIngredients();
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.emitNewIngredients();
    }

    emitNewIngredients() {
        this.ingredientsUpdated.next(this.ingredients.slice());
    }
}