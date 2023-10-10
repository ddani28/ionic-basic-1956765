import { Component } from '@angular/core';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { AutService } from '../service/aut.service';

@Component({
  selector: 'app-home',
  templateUrl: 'logout.page.html',
  styleUrls: ['logout.page.scss'],
})
export class LogoutPage {

  isLoged : any = false;

  constructor(
    private authService: AutService,
    private router: Router
  ) {

    onAuthStateChanged(this.authService.getStateAuth(), (user: null | undefined)=>{
      if(user!=null && user != undefined){
        this.isLoged = true;
      }
    });

  }

  onLogout(){
    signOut(this.authService.getStateAuth()).then(()=>{
      console.log("Logout!");
      this.router.navigateByUrl('/login');
    }).catch(()=>{

    });
  }

}