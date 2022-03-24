import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from './../../recipe.model';
import { RecipesService } from './../../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) {
    // console.log(this.route.params['name']);
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeDetail = this.recipesService.getRecipe(params['id']);
    });
   }

  onClickSendShoppingList() {
    this.recipesService.sendToShoppingList(this.recipeDetail.ingredients);
  }
}
