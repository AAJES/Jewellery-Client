import { Component } from '@angular/core';
import { SchemeCustomerReceipt } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';

@Component({
  selector: 'app-schemecustomer-receipt',
  templateUrl: './schemecustomer-receipt.component.html',
  styleUrls: ['./schemecustomer-receipt.component.css']
})
export class SchemecustomerReceiptComponent {
  
  schemeCustomer : SchemeCustomerReceipt = {
    schemeCustomerRecId: 0,
    customerLuckyNo: 0,
    customerName: '',
    customerPhone: '',
    remark: '',
  }
  constructor (private service : MainService){

  }

  public onSubmit(){
    this.service.addSchemeCustomerReceipt(this.schemeCustomer, ( data : any) =>{
      console.log(data);
    })
    
    
  }



}
