import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '././recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  currentRecipe: Recipe;
  eventSubscription: Subscription;

  constructor(private recipesService : RecipesService) { }

  ngOnInit(): void {
    this.eventSubscription = this.recipesService.recipeSelected.subscribe((recipeRec: Recipe) => {
      this.currentRecipe = recipeRec;
    });
   }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }
}
