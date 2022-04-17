import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {   }

  onClickSave() {
    console.log("onClickFetch()");
    this.dataStorageService.storeRecipes();
  }
  
  onClickFetch() {
    console.log("onClickFetch()");
    const newIngredient = new Ingredient('milk', 3);
    const ingredients = [newIngredient];
    this.dataStorageService.fetchRecipes();
  }
}
