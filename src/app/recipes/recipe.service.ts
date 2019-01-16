import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs/Subject';
import { shoppingListService } from "../shopping-list/shopping.service";
@Injectable()
export class recipeService {
    recipesChanged = new Subject<Recipe[]>();
    recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [new Ingredient('chicken', 1),
            new Ingredient('garlic bread', 20)]),


        new Recipe('Big Fat Burger',
            'What else you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [new Ingredient('tuna', 10)]),
        new Recipe('Delicious sub',
            'Crispy Sub',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_zIQBKqv4A2NMceu_PL1fIO0w42I79PCv2D7XbfZfgcCMTHy', [new Ingredient('tuna', 10)]),
            new Recipe('pizza',
            'Cheese burst pizza',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2lYnlz8d-eLRXMyGKK_9uByIz37ObMTwlhJdu7yZjVK2Gv10', [new Ingredient('tuna', 10)]),
            new Recipe('lasagne ',
            'What else you need to say?',
            'http://cookingwithmykid.com/wp-content/uploads/2011/07/RavioliLasagna_071211_LO6.jpg', [new Ingredient('tuna', 10)]),
            new Recipe('Delecious sub',
            'What else you need to say?',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz_zIQBKqv4A2NMceu_PL1fIO0w42I79PCv2D7XbfZfgcCMTHy', [new Ingredient('tuna', 10)]),
            
    ];
    constructor(private shoppingListService: shoppingListService) { }
    getRecipe() {
        return this.recipes;
    }
    setRecipes(setrecipe: Recipe[]) {
        this.recipes = setrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    addIngredientToShoppinglist(ingredient: Ingredient[]) {
        this.shoppingListService.addIngredient(ingredient);
    }
    getRecipesById(index: number) {
        return this.recipes[index];
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;

        this.recipesChanged.next(this.recipes.slice());
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);

        this.recipesChanged.next(this.recipes.slice());
    }



}