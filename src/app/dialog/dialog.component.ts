import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  datas : any = [];
  returns : any[] = [];
  sales : any[] = [];
  bookings : any[] = [];
  booking : boolean = false;
  return : boolean = false;
  sale : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     this.datas = data;
     for(let i=0;i<this.datas.length;i++){
      
        const bookingId = this.datas[i].bookingId;
        console.log(bookingId);
        const returnId = this.datas[i].returnId;
        console.log(returnId);

        const salesId = this.datas[i].salesId;
        console.log(salesId);

        if(bookingId != undefined ){
           this.bookings = this.datas;
           this.booking = true;
          
        }else if(returnId != undefined){
           this.returns = this.datas;
           
           this.return = true;
          
        }else if(salesId != undefined) {
            this.sales = this.datas;
            this.sale = true;
            console.log(this.sales);
            console.log(this.sale);
        }
     }
  }
}
