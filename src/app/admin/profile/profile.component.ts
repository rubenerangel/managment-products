import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl, 
  Validators
} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  uploadPercent: Observable <number>;
  urlImage: Observable <string>;
  messageSucces: string = '';

  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(
    private storage: AngularFireStorage, 
    private authService: AuthService
  ) { }

  user: UserInterface = {
    displayName: '',
    email: '',
    photoURL: ''
  };

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.displayName = user.displayName;
        this.user.photoURL = user.photoURL;
        this.user.email = user.email;
      }
    })
  }

  onSubmit() {
    const data = this.profileForm.value;
    this.authService.isAuth().subscribe( user => {
      if (user) {
        user.updateProfile({
          displayName: data.displayName,
          photoURL: this.inputImageUser.nativeElement.value
        })
        .then(resp => {
          this.messageSucces = 'Successfully Updated Profile';
          console.log(resp);
        })
        .catch(error => {
          console.log(error.message)
        });
      }
    });
    console.log(this.inputImageUser.nativeElement.value);
  }

  onUpload(e) {
    // console.log('subir: ', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/profile/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent= task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => this.urlImage = ref.getDownloadURL() ) ).subscribe();
  }

}
