import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subject} from "rxjs/Subject";

import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';


@Injectable()
export class AuthServiceProvider {

  private hasLoggedInFlag: boolean;
  user: any;
  private stateChangeSource = new Subject<boolean>();
  stateChange$ = this.stateChangeSource.asObservable();

  constructor(public firebaseAuth: AngularFireAuth) {
    firebaseAuth.auth.onAuthStateChanged(user => {
      if(user) {
        this.hasLoggedInFlag = true;
        this.user = user;
        this.stateChangeSource.next(true);
      } else {
        this.hasLoggedInFlag = false;
        this.stateChangeSource.next(false);
      }
    });
  }

  hasLoggedIn() : boolean {
    return this.hasLoggedInFlag;
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.firebaseAuth.auth.signInWithPopup(provider).then(function(res) {
      console.log("Login done...");
      console.log(res);
    }).catch(function (err) {
      console.log("error:" + err)
    })
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }


}
