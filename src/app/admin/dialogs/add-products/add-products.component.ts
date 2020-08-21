import { Component, OnInit, Inject } from '@angular/core';
import { ProductApiService } from 'src/app/services/product-api.service';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from '@angular/forms';
import {
  MatDialog, 
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http'; 

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public productDataAPI: ProductApiService,
    private _http: HttpClient
  ) { }
  productForm: FormGroup;
  dialogAddProduct: MatDialog;
  public editForm: String;
  public countries;

  ngOnInit() {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required, Validators.minLength(1)])
    });

    this._http.get('https://restcountries.eu/rest/v2/all?fields=name')
    .subscribe(resp => {
        console.log(resp);
        this.countries = resp;
    });
  }

  
}
