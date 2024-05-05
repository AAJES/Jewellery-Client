import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../main.service';
import { SchemeReceipts } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-schemereceiptsall',
  templateUrl: './schemereceiptsall.component.html',
  styleUrls: ['./schemereceiptsall.component.css']
})
export class SchemereceiptsallComponent {

  columns: string[] = ['SlNo.','Customer','Lucky No.', 'January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','Total'];
  dataArray : any[] = [];
  schemeReceipts : any[] = [];
  schemes : any[] = [];
  dataSource : any[]= [];

  schemeReceipts1:SchemeReceipts={
    schemeReceiptId: 0,
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
    paymentDate: '',
    schemeCustomerReceipt: {
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
    },
    trDate: '',
    amount: 0,
    modeOfPayment: {
      modeofPaymentId: 0,
      modeOfPayment: ''
    }
  }
  scheme : any = {};
  selectedScheme: any;

  constructor(private service : MainService) {
      this.service.getAllSchemes((data : any)=>{
          this.schemes = data;
      })

      // this.service.getAllSchemeReceipts((data : any)=>{
      //    this.schemeReceipts = data;
      // })
   }

   luckyNo : any[] =[];

   public getByCustomerName() {
    const uniqueCustomerNames = new Set<string>();
  
    for (let i = 0; i < this.schemeReceipts.length; i++) {
      const customerName = this.schemeReceipts[i].schemeCustomerReceipt.customerName;
  
      
      if (!uniqueCustomerNames.has(customerName)) {
        uniqueCustomerNames.add(customerName);
  
       
        const luckyNo = this.schemeReceipts[i].schemeCustomerReceipt.customerLuckyNo;
        
  
        this.service.getAllSchemeReceiptsByCustomerName(customerName, (data: any) => {
          
          this.dataArray = data;
  
          
          const monthlyTotals: any[] = new Array(15).fill(0);
          monthlyTotals[0] = customerName;
          
          if (luckyNo !== undefined) {
            monthlyTotals[1] = luckyNo;
          } else {
          
          }
  
          this.dataArray.forEach((booking) => {
           
            const saleDate = new Date(booking.paymentDate);
            const month = saleDate.getMonth();
            const monthly = month + 2;
            const actualAmount = booking.amount;
            monthlyTotals[monthly] += actualAmount;
            monthlyTotals[14] += actualAmount; // "Total" column
          });
          
          this.dataSource.push(monthlyTotals);
        
        });
      }
    }
  }
  
  
  

   public onSchemeSelectionChange(selectedSchemeId : any){
   
    this.dataSource = [];

    console.log(selectedSchemeId)
    this.service.getScheme(selectedSchemeId, (data : any)=>{
       this.scheme = data;
       this.service.getAllSchemeReceiptsByScheme(selectedSchemeId,(data : any)=>{
          console.log(data);
          this.schemeReceipts = data;
          this.getByCustomerName();
       })
    })
   }

  ngOnInit(): void {
    
  }

}
