import { Output,EventEmitter, Input, ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") ingredientForm: NgForm;
  ingredientSubscription : Subscription;
  @Output() saveIngredient = new EventEmitter<Ingredient>();
  editMode = false;
  editIndex: number;
  editIngredient: Ingredient;

  ingredient = {
    name: '',
    amount: ''
  };

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientSubscription = this.shoppingListService.currentIngredient.subscribe((data: number) => {
      this.editMode = true;
      this.editIndex = data;
      this.editIngredient = this.shoppingListService.getIngredient(this.editIndex);

      this.ingredientForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount
      });
    });
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  onClickAdd() {
    this.resetFields();
  }

  onClickEdit() {
    console.log('Delete');
  }
  
  onClickReset() {
    this.resetFields();
  }
  
  resetFields () {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onSubmit(form: NgForm){
    const {name, amount} = form.value;
    const newIngredient = new Ingredient(name, amount);

    if(this.editMode)
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient);
    else 
      this.shoppingListService.saveIngredient(newIngredient);
    
      this.resetFields();
  } 

  onUpdateItem(index: number, ingredient: Ingredient) {
  }
}
