import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
  public name:string;
  public description:string;
  public imagePath: string;
  public ingredient:Ingredient[];
  constructor(name:string,description:string,imagepath:string,ingredient:Ingredient[]){
    this.name=name;
    this.description=description;
    this.imagePath=imagepath;
    this.ingredient=ingredient;


  }

}