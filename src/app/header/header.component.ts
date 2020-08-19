import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() deviceXs: boolean; 
  isLogged: boolean = false;

  ngOnInit() {
    this.getCurrenUser();
  }

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private afAuth: AngularFireAuth) {}

  getCurrenUser(): void {
    this.authService.isAuth().subscribe( (auth) => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  logOut(): void {
    this.authService.logoutUser()
    .then(res => {
      this.router.navigate(['']);
    })
    .catch(error => error.message)
  }
}
