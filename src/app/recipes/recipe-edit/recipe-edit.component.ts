import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  
  id: number;
  editMode: boolean = false;
  paramsSubscription: Subscription;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipesService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipeDescription = recipe.description;
      
      if(recipe.ingredients) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
      
    }

    this.recipeForm = new FormGroup({
      '_name': new FormControl(recipeName),
      '_imagePath': new FormControl(recipePath),
      '_description': new FormControl(recipeDescription),
      '_ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('_ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }
}
