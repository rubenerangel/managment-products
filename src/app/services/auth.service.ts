import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth ));
  }
  
  loginEmailUser(email: string, pass: string) {
    return new Promise((res, rej) => {
      this.afAuth.signInWithEmailAndPassword(email, pass)
      .then(userData => res(userData),
        error => rej (error));
    });
  }

  logoutUser() {
    return this.afAuth.signOut();  // Redirect to Home
  }
}
