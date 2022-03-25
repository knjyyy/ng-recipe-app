import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './../../recipe.model';
import { RecipesService } from './../../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeDetail: Recipe;
  id: number; 
  paramsSubscription: Subscription;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetail = this.recipesService.getRecipe(this.id);
    });
   }

  ngOnDestroy () {
    this.paramsSubscription.unsubscribe();
  }

  onClickSendShoppingList() {
    this.recipesService.sendToShoppingList(this.recipeDetail.ingredients);
  }

  onClickEdit() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
}
