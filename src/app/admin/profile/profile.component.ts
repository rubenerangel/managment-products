import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl, 
  Validators
} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private storage: AngularFireStorage, 
    private authService: AuthService
  ) { }

  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  };

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.authService.isAuth().subscribe(user => {
      if (user) {
        console.log(user);
        this.user = user;
        console.log('USER', user);
      }
    })
  }

  onSubmit() {}

  onUpload(e) {
    console.log(e.target.files[0]);
  }

}
