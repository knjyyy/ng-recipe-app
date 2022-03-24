import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService  {
    ingredientsUpdated = new EventEmitter<Ingredient[]>();
    ingredients: Ingredient[] = [new Ingredient('Cheese', 12), new Ingredient('Fries', 19)];

    getIngredients() {
        return this.ingredients.slice();
    }

    saveIngredient(saveIngredient: Ingredient) {
        this.ingredients.push(saveIngredient);
        this.emitNewIngredients();
    }

    saveIngredients(saveIngredients: Ingredient[]) {
        this.ingredients.push(...saveIngredients);
        this.emitNewIngredients();
    }

    emitNewIngredients() {
        this.ingredientsUpdated.emit(this.ingredients.slice());
    }
}