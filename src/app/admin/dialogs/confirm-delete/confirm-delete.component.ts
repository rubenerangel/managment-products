import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  title: String = 'Delete record';
  message: string = 'Are you sure';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmDeleteComponent>
  ) { 
    if(data) {
      this.message = data.message || this.message;
    }

    if(data.buttonText) {
      this.confirmButtonText = data.buttonText.ok ||
        this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel ||
        this.cancelButtonText;
    }
  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
