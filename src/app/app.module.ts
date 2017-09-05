import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from "angularfire2/database";

import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tasklist/tasklist';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {AngularFireAuthModule} from "angularfire2/auth";


export const firebaseConfig = {
  apiKey: "AIzaSyAAnhn0FPbSYN96cUfFu3zgVhdPDRXAe6c",
  authDomain: "ionic2do-c7f54.firebaseapp.com",
  databaseURL: "https://ionic2do-c7f54.firebaseio.com",
  projectId: "ionic2do-c7f54",
  storageBucket: "ionic2do-c7f54.appspot.com",
  messagingSenderId: "871901748847"
};


@NgModule({
  declarations: [
    MyApp,
    TaskListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
