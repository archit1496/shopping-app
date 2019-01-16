import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingListService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  editmode:boolean=false;
  editedItemIndex:number;
  editItem:Ingredient;
  @ViewChild('f') form:NgForm;
 constructor(private shoppingListService:shoppingListService ) { 
  
 }

  ngOnInit() {
     this.subscription=this.shoppingListService.startedEditing
     .subscribe(
         (index:number)=>{
           this.editedItemIndex=index;
           this.editmode=true;
           this.editItem=this.shoppingListService.getIngredient(index);
           this.form.setValue({
             name:this.editItem.name,
             amount:this.editItem.amount
           })
             
           
         }
     )
  }
  ngOnDestroy(){
     this.subscription.unsubscribe();
  }
  onAddItem(form:NgForm){
    const value=form.value;

    const ingredient=new Ingredient(value.name,value.amount);
    if(this.editmode==true){
      this.shoppingListService.updateIndgredient(this.editedItemIndex,ingredient);
      form.reset();
      this.editmode=false;
    }
    else{
    
    this.shoppingListService.addnewIngredient(ingredient);
    form.reset();
    }
  }
  onClear(){
    this.form.reset();
    this.editmode=false;

  }
  onDelete(){
     this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }



}
