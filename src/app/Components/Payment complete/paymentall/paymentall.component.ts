import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-paymentall',
  templateUrl: './paymentall.component.html',
  styleUrls: ['./paymentall.component.css']
})
export class PaymentallComponent {
  displayedColumns: string[] = ['paymentId', 'amountPaid'];
  paymentList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllPayment((response : any)=>{
        this.paymentList = response;
    })
  }
}
