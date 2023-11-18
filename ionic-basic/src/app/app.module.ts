import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { FloatMenuComponent } from './float-menu/float-menu.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers, Storage } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, FloatMenuComponent],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [ Drivers.LocalStorage]
    })
  ],
  providers: [NavParams, HttpClientModule,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}