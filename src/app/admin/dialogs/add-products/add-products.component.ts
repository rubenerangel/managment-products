import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  productForm: FormGroup;
  dialogAddProduct: MatDialog;
  public editForm: String;

  ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  addProduct() {
    /*  */
  } 
}
