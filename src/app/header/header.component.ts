import { Component} from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import {Response} from '@angular/http';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  
  constructor(private dataStorage:dataStorageService,private authService:AuthService){
     
  }
  onSaveData(){
    this.dataStorage.storeRecipes()
    .subscribe(
      (response:Response)=>{
        console.log("your response ="+response);
      }
    );
  }
  onFetchData(){
    this.dataStorage.getRecipes();
  }
  onLogout(){
    this.authService.logout();
    
  }
}
