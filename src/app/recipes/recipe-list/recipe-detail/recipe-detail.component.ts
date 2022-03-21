import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './../../recipe.model';
import { RecipesService } from './../../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void { }

  onClickSendShoppingList() {
    this.recipesService.sendToShoppingList(this.recipeDetail.ingredients);
  }
}
