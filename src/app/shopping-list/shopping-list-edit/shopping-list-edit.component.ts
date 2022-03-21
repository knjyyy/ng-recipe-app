import { ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('ingredientName', {static: false}) editName: ElementRef;
  @ViewChild('ingredientAmount', {static: false}) editAmount: ElementRef;
  @Output() saveIngredient = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onClickAdd() {
    this.shoppingListService.saveIngredient(new Ingredient(this.editName.nativeElement.value, this.editAmount.nativeElement.value))
    this.resetFields();
  }

  onClickEdit() {
    console.log('Delete');
  }
  
  onClickReset() {
    this.resetFields();
  }
  
  resetFields () {
    this.editName.nativeElement.value = "";
    this.editAmount.nativeElement.value = "";
  }
}
