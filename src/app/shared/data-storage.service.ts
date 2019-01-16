import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Response} from '@angular/http'
import { recipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class dataStorageService {
    constructor(private http: Http, private recipeService: recipeService,private authService:AuthService) {

    }
    storeRecipes() {
        const token=this.authService.getToken();
        return this.http.put('https://recipe-app-cd5b0.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipe());
      }
    getRecipes(){
        
        const token=this.authService.getToken();
        console.log("yourtokenis="+token);
        this.http.get('https://recipe-app-cd5b0.firebaseio.com/recipes.json?auth='+token)
        .subscribe(
            (response:Response)=>{
              const recipe=response.json();
              this.recipeService.setRecipes(recipe);
              console.log("get"+response);
            }
        );
    }
}