import { Output,EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @Output() saveIngredient = new EventEmitter<Ingredient>();
  ingredient = {
    name: '',
    amount: ''
  };

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
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
  }

  onAddItem(form: NgForm){
    const {name, amount} = form.value;
    this.shoppingListService.saveIngredient(new Ingredient(name, amount));
    form.reset();
  } 
}
