import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menu } from 'src/app/interface/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutService } from '../service/aut.service';
import { MenuService } from '../service/menu.service';
import { onAuthStateChanged } from 'firebase/auth';
@Component({
  selector: 'app-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['./float-menu.component.scss'],
})
export class FloatMenuComponent  implements OnInit, OnDestroy {

  titleMenu: string='home';
  public isLoged : any = false;

  public subscription : Subscription | undefined ;

  datosMenu: Menu[] =[
    {nombre: 'login',enlace:'/login',
    icono:'log-in-outline'},
    {nombre: 'logout',enlace:'/home',
    icono:'log-out-outline'}
  ];
  constructor(
    private autService: AutService,
    private menuService: MenuService,
    private router: Router
  ) {

    onAuthStateChanged(this.autService.getStateAuth(), (user: null | undefined)=>{
      if(user!=null && user != undefined){
        this.isLoged = true;
      }
    });

    this.subscription = this.menuService.$getTitleMenu.subscribe(data=>{
      console.log(data);
      this.titleMenu =data;
    });

   }

  ngOnInit() {}

  ngOnDestroy(): void {
    if(this.subscription != null || this.subscription!= undefined){
      this.subscription.unsubscribe();
    }
  }

  navegar(link: string, titleMenu: string){
    this.titleMenu =titleMenu;
    this.menuService.setTitle(titleMenu);
    this.router.navigate([link]);
  }
  
  onMenuOpen(){
    onAuthStateChanged(this.autService.getStateAuth(), (user: null | undefined)=>{
      if(user!=null && user != undefined){
        this.datosMenu =[
          {nombre: 'Alumnos',enlace:'/alumnos',
    icono:'school-outline'},
      {nombre: 'Receteas',enlace:'/receta',
      icono:'restaurant-outline'},
      {nombre: 'inicio',enlace:'/inicio',
      icono:'navigate-outline'},
      {nombre: 'Turismo',enlace:'/destinos',
      icono:'airplane'},
      {nombre: 'Tabs',enlace:'/tabs',
      icono:'folder-outline'},
      {nombre: 'login',enlace:'/login',
      icono:'log-in-outline'},
          {nombre: 'logout',enlace:'/logout',
          icono:'log-out-outline'}
        ];

      }       
     else{
        this.datosMenu =[
          {nombre: 'login',enlace:'/login',
          icono:'log-in-outline'},
          {nombre: 'logout',enlace:'/logout',
          icono:'log-out-outline'}
        ];
      }
    });
  }
}