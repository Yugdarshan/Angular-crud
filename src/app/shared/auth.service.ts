import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Auth, sendEmailVerification } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: AngularFireAuth, private router: Router,
  ) { }


  // Login Method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      if (res.user?.emailVerified === true) {
        this.router.navigate(['/dashboard']);
      }
      else {
        // this.router.navigate(['/varify-email']);
        this.sendEmailForVarification(res.user);

      }
    },
      err => {
        alert(err.message);
        this.router.navigate(['/login']);
      });
  }

  // Register Method

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration is Successful.');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);
    }, err => {
      this.router.navigate(['/register']);
    });
  }


  // Logout method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },
      err => {
        alert(err.message);
      });
  }

  // Forgot Password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    },
      err => {
        alert('something went wrong');
      })
  }

  // Email varification
  sendEmailForVarification(user: any) {
    sendEmailVerification(user).then(() => {
      this.router.navigate(['/varify-email']);
    })
    // sendEmailVerification(auth.currentUser).then
    // user.sendEmailVarification().then((res: any) => {
    //   this.router.navigate(['/varify-email']);
    // },
    //   (err: any) => {
    //     alert('something went wrong. Not able to send mail to your email');
    //   });
  }
}
