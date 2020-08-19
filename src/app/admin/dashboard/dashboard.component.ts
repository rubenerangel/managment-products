import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductApiService } from 'src/app/services/product-api.service';
import { ProductInterface } from '../../models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog, 
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
/* Dialogs */
import { ConfirmDeleteComponent } from '../dialogs/confirm-delete/confirm-delete.component';
import { AddProductsComponent } from '../dialogs/add-products/add-products.component';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  productForm: FormGroup;
  public products: MatTableDataSource<ProductInterface>;
  displayedColumns: string[] = ['id','name', 'price'];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private productDataAPI: ProductApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getListProducts();
  }

  openDialodAddProduct(product: ProductInterface = {id: null} ) { // Open Dialog to Add or Update
    let openAddProducts;

    /* Open Modal */
    if (product.id == null) { // Add
      openAddProducts = this.dialog.open(AddProductsComponent, {data: {product, title: 'Add Product', button: 'Save'}});
    } else { // Update
      openAddProducts = this.dialog.open(AddProductsComponent, {data: {product, title: 'Update Product', button: 'Update'}});
    }

    /* Closed Modal And Save or Update */
    openAddProducts.afterClosed().subscribe(result => {
      this.debugResponses(result);
      if (result.id === null) {
        this.productDataAPI.addProduct(result).then(resp => {
          this.debugResponses(resp)
        })
        .catch(error => {
          this.debugResponses(error.message);
        });
      } else {
        this.productDataAPI.updateProduct(result)
        .then(resp => {
          console.log(resp);
        })
        .catch(error => {
          console.log(error.message);
        })
      } 
    });
  }
  
  getListProducts() {
    this.productDataAPI.getAllProducts().subscribe(
      arrayProducts => {
        this.products = new MatTableDataSource(arrayProducts);
        this.products.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }

  addProduct(): void {
    console.log(this.productForm.value);
  }

  editProduct(idProduct: string) {
    this.productDataAPI.getOneProduct(idProduct).subscribe(
      res => {
        this.debugResponses(res);
      }
    );
  }

  deleteProduct(idProduct: string): void {
    this.productDataAPI.deleteProduct(idProduct);
    // let confirmDelete = this.dialog.open(ConfirmDeleteComponent);
  }

  debugResponses(someOne: any) {
    console.log('Response: ', someOne);
  }
}
