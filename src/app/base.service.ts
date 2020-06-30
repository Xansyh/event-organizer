import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  user$: Observable<any>;
  userRef: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.userRef = afs.collection('user');
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    var result: any;
    await this.afAuth.signInWithPopup(provider).then(o => {
      console.log(o);
    }).catch(function(error) {
      console.log(error);
    });
  }

  signUp(email: string, password: string): Observable<any> {
    try {
      const result = from(this.afAuth.createUserWithEmailAndPassword(email, password));
      window.alert("You have been successfully registered!");
      return result;
    }
    catch (error) {
      window.alert(error.message);
      return error;
    }
  }

  signIn(email: string, password: string): Observable<any> {
    try {
      const result = from(this.afAuth.signInWithEmailAndPassword(email, password));
      return result;
      // this.router.navigate(['<!-- enter your route name here -->']);
    }
    catch (error) {
      window.alert(error.message);
      return error;
    }
  }

  async signOut() {
    this.afAuth.signOut().then(o => {
      console.log('log out successful');
    }).catch(function(error) {
      console.log(error);
    });
    
  }

  createUser(userParam: any): void {
    this.userRef.doc(userParam.uid).set({
      username: userParam.username,
      email: userParam.email,
    });
  }

  getUserList(uid: string): Observable<any> {
    return this.userRef.doc(uid).valueChanges();   
  }
}
