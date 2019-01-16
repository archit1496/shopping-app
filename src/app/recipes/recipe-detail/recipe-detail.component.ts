import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe:Recipe;
id:number;
constructor(private recipeService: recipeService,private route:ActivatedRoute,private router:Router) { }

ngOnInit() {
  this.route.params.subscribe(
    (param:Params)=>{
       this.id=+param['id'];
       this.recipe=this.recipeService.getRecipesById(this.id);
    }
  );
}
onAddToShoppingList(){
  this.recipeService.addIngredientToShoppinglist(this.recipe.ingredient);
}
onEditRecipe(){
this.router.navigate(['edit'],{relativeTo:this.route});
}
onDelete(){
   this.recipeService.deleteRecipe(this.id);
   this.router.navigate(['/recipes']);
}
}
