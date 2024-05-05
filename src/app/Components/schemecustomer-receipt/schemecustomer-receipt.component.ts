import { Component, OnInit, ViewChild } from '@angular/core';
import { SchemeCustomerReceipt } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-schemecustomer-receipt',
  templateUrl: './schemecustomer-receipt.component.html',
  styleUrls: ['./schemecustomer-receipt.component.css']
})
export class SchemecustomerReceiptComponent implements OnInit {
  
  schemeCustomer : SchemeCustomerReceipt = {
    schemeCustomerRecId: 0,
    customerLuckyNo: 0,
    customerName: '',
    customerPhone: '',
    remark: '',
    scheme: {
      schemeId: 0,
      schemeName: '',
      schemeAmount: 0,
      startDate: '',
      endDate: '',
      trDate: '',
      amountPerMonth: 0,
      totalSizeCustomer: 0
    },
    email: ''
  }

  allschemeCustomerReceipt: any[] = [];
  schemes: any;

  constructor(private service: MainService, private router: Router) {}
  
  ngOnInit() {
    // this.service.getschemeCustomerReceipt((data: any) => {
    //   this.allschemeCustomerReceipt = data;
    // });


    this.service.getAllSchemes( (data:any)=> {
      this.schemes = data;
    })
  }


  public onChangeScheme(id :any){
    console.log(id)
    this.service.getScheme(id,(data:any)=>{
      console.log(data)
      this.schemeCustomer.scheme=data;
      this.service.getSchemeCustomerReceiptByschemeId(this.schemeCustomer.scheme.schemeId,(data:any)=>{
        this.allschemeCustomerReceipt=data;
      })
    })
  }

  public onSubmit(){
    console.log(this.schemeCustomer)
    this.service.addSchemeCustomerReceipt(this.schemeCustomer, ( data : any) =>{
      console.log(data);
      // this.router.navigate(['/home3'])
      this.service.getschemeCustomerReceipt((data: any) => {
        this.allschemeCustomerReceipt = data;
      });
    })
    
    
  }



}
