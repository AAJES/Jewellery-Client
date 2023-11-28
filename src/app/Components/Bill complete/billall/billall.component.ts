import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-billall',
  templateUrl: './billall.component.html',
  styleUrls: ['./billall.component.css']
})
export class BillallComponent {
  
  displayedColumns: string[] = ['billId', 'paymentId', 'amountPaid' , 'discountAmount' , 'actualAmount' , 'gst' , 'customer' ];
  billList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllBill((response : any)=>{
        this.billList = response;
    })
  }

}
