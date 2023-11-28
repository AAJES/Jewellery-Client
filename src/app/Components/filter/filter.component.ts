import { Component, Inject } from '@angular/core';
import { Product } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDataExampleDialogComponent } from '../dialog-data-example-dialog/dialog-data-example-dialog.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  

  constructor(public dialog: MatDialog){}

  openDialog() {
    this.dialog.open(DialogDataExampleDialogComponent, {
      data: {
        
      },
    });
  }




  




}


