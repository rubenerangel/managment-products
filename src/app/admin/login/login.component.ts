import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {
  FormGroup, 
  FormControl, 
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public errorLogin: string = '';
  
  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  onSubmit() {
    let data = this.loginForm.value;
    this.authService.loginEmailUser(data.email, data.password)
    .then( res => {
      this.dashboardRedirect();
    })
    .catch(error => {
      this.errorLogin = error.message
      console.log(this.errorLogin);
    });
  }

  logOut() {
    this.authService.logoutUser()
    .then(resp => {
      this.router.navigate([''])
    })
    .catch(error => this.messageError(error));
  }

  dashboardRedirect(): void {
    this.router.navigate(['/dashboard']);
  }

  messageError(error) {
    return console.log(error.message)
  }
}
