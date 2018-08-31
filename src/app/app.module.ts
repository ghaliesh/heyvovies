import { AboutPageModule } from './../pages/about/about.module';
import { SearchPageModule } from './../pages/search/search.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { EngineProvider } from '../providers/engine/engine';
import { MyApp } from './app.component';
import { AlertProvider } from '../providers/alert/alert';
import { AppErrorHandler } from '../errors/app-error-handler';
import { SuggestedPageModule } from '../pages/suggested/suggested.module';
import { HomePageModule } from '../pages/home/home.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [MyApp, TabsPage],
  imports: [
    AboutPageModule,
    HomePageModule,
    DetailPageModule,
    SearchPageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SuggestedPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    EngineProvider,
    AlertProvider,
    Clipboard
  ]
})
export class AppModule {}
