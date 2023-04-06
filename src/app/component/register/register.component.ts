import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  register() {
    if (this.email === '') {
      alert('Enter Email ID');
      return;
    }

    if (this.password === '') {
      alert('Enter Password');
      return;
    }

    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';
  }
} 
