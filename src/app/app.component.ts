import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public selectedFeature;
    constructor(private authService:AuthService,private router:Router){
    //   if(!this.authService.isAuthenticated()){
    //     console.log();
    //     this.router.navigate(['/signin']);
    //  }
    }
    ngOnInit() {
      firebase.initializeApp({
        apiKey: "AIzaSyCS6uG7o8fOIC9WR34VzPuXBQwal0NMykk",
        authDomain: "recipe-app-cd5b0.firebaseapp.com"
      });
     
    }
  
  onClickSelctedFeature(feature:any){
    console.log("archit"+feature);
    this.selectedFeature=feature;
  }
  


}
