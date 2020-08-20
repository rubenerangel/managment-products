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
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getListProducts();
  }

  openDialodAddProduct(product: ProductInterface ) { // Open Dialog to Add or Update
    this.debugResponses(this.dialog);
    let openAddProducts;
    return false;

    /* Open Modal */
    if (product.id == null) { // Add
      openAddProducts = this.dialog.open(
        AddProductsComponent, 
        {
          data: {
            product, 
            title: 'Add Product', 
            button: 'Save',
          },
          disableClose: true
        }
      );
    } else { // Update
      openAddProducts = this.dialog.open(
        AddProductsComponent, 
        {
          data: {
            product, 
            title: 'Update Product', 
            button: 'Update',
          },
          disableClose: true
        }
      );
    }

    /* Closed Modal And Save or Update */
    openAddProducts.afterClosed().subscribe(result => {
      if (result.id === null) {
        this.productDataAPI.addProduct(result).then(resp => {
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
    const confirmDelete = this.dialog.open(ConfirmDeleteComponent,{
      data: {
        title: 'Delete Record',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    confirmDelete.afterClosed().subscribe( (confirmed: boolean) => {
      this.debugResponses(confirmed);
      if (confirmed) {
        this.productDataAPI.deleteProduct(idProduct);
      }
    });
  }

  debugResponses(someOne: any) {
    console.log('Response: ', someOne);
  }
}
