import { Component, OnInit, Output } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import{shoppingListService} from './shopping.service'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
 
  ingredients:Ingredient[];
  
  constructor(private shoppingListService:shoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shoppingListService.ingredients;
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
}
