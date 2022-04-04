import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'] 
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subs: Subscription;
  currentIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subs = this.shoppingListService.ingredientsUpdated.subscribe((ingredientsUpdated: Ingredient[]) => {
      this.ingredients = ingredientsUpdated;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.currentIngredient.next(index);
  }
}