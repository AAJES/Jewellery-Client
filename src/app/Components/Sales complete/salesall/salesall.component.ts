import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-salesall',
  templateUrl: './salesall.component.html',
  styleUrls: ['./salesall.component.css']
})
export class SalesallComponent {
  displayedColumns: string[] = ['salesId', 'totalAmount', 'discountAmount', 'paymentStatus', 'wastage', 'grossWeight','netWeight', 'actualAmount','quantity', 'billGeneratedOrNo'];
  salesList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllSales((response : any)=>{
        this.salesList = response;
    })
  }
}
