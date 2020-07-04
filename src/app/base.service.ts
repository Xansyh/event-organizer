import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, of, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  accessToken = null;
  username = null;
  role = null;
  user$: Observable<any>;
  userRef: AngularFirestoreCollection;
  featuredEventRef: AngularFirestoreCollection;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
  ) {
    this.userRef = afs.collection('user');
    this.featuredEventRef = afs.collection('featuredEvents');
  }

  async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    var result: any;
    await this.afAuth.signInWithPopup(provider).then(o => {
      console.log(o);
    }).catch(function (error) {
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
    this.accessToken = null
    this.role = null
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.reload();
    // this.afAuth.signOut().then(o => {
    //   console.log('log out successful');
    // }).catch(function(error) {
    //   console.log(error);
    // });

  }

  createUser(userParam: any): void {
    this.userRef.doc(userParam.uid).set({
      username: userParam.username,
      email: userParam.email,
      role: userParam.role,
    });
  }

  getUserList(uid: string): Observable<any> {
    return this.userRef.doc(uid).valueChanges().pipe(
      tap((o: any) => {
        if (o) {
          this.accessToken = o.uid
          this.username = o.username
          this.role = o.role
          localStorage.setItem('accessToken', this.accessToken);
          localStorage.setItem('username', this.username);
          localStorage.setItem('role', this.role);
        }
      })
    );
  }

  uploadEvent(params: any) {
    const eventId = uuid();
    const filePath = 'event-images/' + eventId + "/image0";
    const ref = this.afStorage.ref(filePath);
    const task = ref.put(params.image);
    this.featuredEventRef.doc(eventId).set({
      title: params.title,
      date: params.date,
      price: params.price,
      eventId: eventId,
      imgUrl: null,
    });
  }

  updateEvent(params: any) {
    this.featuredEventRef.doc(params.eventId).update({
      imgUrl: params.imgUrl,
    });
  }

  getFeaturedEvents(): Observable<any>{
    return this.featuredEventRef.valueChanges();
  }

  getStorageImage(code: string): Observable<any> {
    let ref = this.afStorage.ref("event-images/" + code + "/image0");
    return ref.getDownloadURL();
  }

  getStorage(code: string): Observable<any> {
    let ref = this.afStorage.ref("event-images/" + code + "/image0");
    return ref.getDownloadURL();
  }

}
