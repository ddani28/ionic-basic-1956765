import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { FloatMenuComponent } from './float-menu/float-menu.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from 'src/environments/firebaseconfig';

@NgModule({
  declarations: [AppComponent, FloatMenuComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  
  providers: [NavParams, HttpClientModule,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }], 
  AngularFireModule.initializeApp(firebaseConfig)
  bootstrap: [AppComponent],
})
export class AppModule {}