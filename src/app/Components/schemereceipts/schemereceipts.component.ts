import { Component } from '@angular/core';
import { SchemeReceipts} from 'src/app/commons/common.objects';
import { MainService } from '../main.service';

@Component({
  selector: 'app-schemereceipts',
  templateUrl: './schemereceipts.component.html',
  styleUrls: ['./schemereceipts.component.css']
})
export class SchemereceiptsComponent {
  schemeReceipts : SchemeReceipts = {
    schemeReceiptId: 0,
    scheme: {
      schemeId: 0,
      schemeName: '',
      schemeAmount: 0,
      startDate: '',
      endDate: '',
      trDate: '',
      amountPerMonth: 0
    },
    schemeCustomerReceipt: {
      schemeCustomerRecId: 0,
      customerLuckyNo: 0,
      customerName: '',
      customerPhone: '',
      remark: ''
    },
    trDate: '',
    amount: 0,
    modeOfPayment: {
      modeofPaymentId: 0,
      modeOfPayment: ''
    },
    paymentDate: ''
  } 


  
 schemes : any[] = [];

 
 schemeCustomers : any[] = [];
 mops : any[] = [];


 constructor(private service : MainService){
  this.service.getAllSchemes((data : any) =>{
    this.schemes=data;
  })

  this.service.getAllSchemeCustomers((data : any)=>{
    this.schemeCustomers=data;
  })

  this.service.getAllModeOfPayment((data : any)=>{
      this.mops = data;
  })
 }

 public onSchemeSelectionChange(schemeId : any){
  this.service.getScheme(schemeId, (data : any)=>{
    this.schemeReceipts.scheme = data;
  })


 }

 public onModeOfPaymentSelectionChange(modeOfPaymentId : any){
    this.service.getModeOfPayment(modeOfPaymentId,(data : any)=>{
        this.schemeReceipts.modeOfPayment = data;
    })
 }

 public onSchemeCustomerSelectionChange(schemeCustomerRecId : any){
  this.service.getSchemeCustomer(schemeCustomerRecId, (data : any)=>{
    this.schemeReceipts.schemeCustomerReceipt = data;
  })
 }

 public onSubmit(){
  this.service.addSchemeReceipt(this.schemeReceipts, (data : any)=>{
    console.log(data);
  })
 }
}
