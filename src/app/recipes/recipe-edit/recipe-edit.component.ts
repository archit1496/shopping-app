import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { recipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup
  constructor(private route: ActivatedRoute, private recipeService: recipeService,private router:Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (param: Params) => {
          this.id = +param['id'];
          this.editMode = param['id'] != null;
          this.initForm();
          console.log(this.editMode);
        }
      );
  }
  private initForm() {

    let recipeName = '';
    let recipePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipesById(this.id);
      recipeName = recipe.name;
      recipePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredient']) {
        for (let ingredient of recipe.ingredient) {
          recipeIngredient.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredient
    })
  }
  onSubmit() {
     const newRecipe = new Recipe(
       this.recipeForm.value['name'],
       this.recipeForm.value['description'],
       this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['../'],{relativeTo:this.route});
    
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
}
