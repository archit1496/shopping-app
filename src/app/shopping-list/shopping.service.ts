import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class shoppingListService {
    startedEditing=new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
  static recipeService: any;

    addnewIngredient(ingredient: Ingredient) {
        console.log("new ingredient added");
        this.ingredients.push(ingredient);
    }
    addIngredient(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient);
        
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    updateIndgredient(index:number,newIngredient:Ingredient){
        // this.ingredients.splice(index,1);
        // this.ingredients.push(newIngredient);
        this.ingredients[index]=newIngredient;
    }
    deleteIngredient(index:number){
       this.ingredients.splice(index,1);
    }
}