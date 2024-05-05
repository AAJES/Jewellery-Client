import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { Customer } from 'src/app/commons/common.objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pendingpayments',
  templateUrl: './pendingpayments.component.html',
  styleUrls: ['./pendingpayments.component.css']
})
export class PendingpaymentsComponent {

  customers : any[] = [];

  customer : Customer = {
    customerId: 0,
    customerName: '',
    gender: {
      genderId: 0,
      gender: ''
    },
    phone1: '',
    phone2: '',
    email: '',
    location: '',
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    }
  }

  payments : any[] = [];

  constructor(private service : MainService,private router : Router){
    this.service.getAllCustomer((data : any)=>{
        this.customers = data;
    })
  }

  public onCustomerSelectionChange(customerId : any) {
    this.service.getCustomer(customerId,(data : any)=>{
          console.log(data);
          this.customer = data;
          this.service.getAllPendingPaymentsByCustomer(this.customer.customerId,(data : any)=>{
              console.log(data);
              this.payments = data;
          })
    })
  }

  public completePayment(paymentId : any){
    this.router.navigate(['/completepayment', { data: paymentId }]);
  }
}
