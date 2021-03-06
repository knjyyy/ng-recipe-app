import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { RecipesService } from './../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.recipes = this.recipesService.getRecipes();

    this.recipesSubscription = this.recipesService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

  onClickNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
