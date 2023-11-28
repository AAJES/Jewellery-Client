import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../main.service';

@Component({
  selector: 'app-schemereceiptsall',
  templateUrl: './schemereceiptsall.component.html',
  styleUrls: ['./schemereceiptsall.component.css']
})
export class SchemereceiptsallComponent {

  columns: string[] = ['Customer', 'January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dataArray : any[] = [];
  schemeReceipts : any[] = [];
  schemes : any[] = [];
  dataSource : any[] = [];
  scheme : any = {};

  constructor(private service : MainService) {
      this.service.getAllSchemes((data : any)=>{
          this.schemes = data;
      })

      // this.service.getAllSchemeReceipts((data : any)=>{
      //    this.schemeReceipts = data;
      // })
   }

   public getByCustomerName(){
      for(let i = 0;i<this.schemeReceipts.length;i++){
        console.log(this.schemeReceipts[i].schemeCustomerReceipt.customerName);
        this.service.getAllSchemeReceiptsByCustomerName(this.schemeReceipts[i].schemeCustomerReceipt.customerName,(data : any)=>{
          console.log(data);
          this.dataArray = data;
          const monthlyTotals: any[] = new Array(13).fill(0);
          monthlyTotals[0] = this.schemeReceipts[i].schemeCustomerReceipt.customerName;
          this.dataArray.forEach((booking) => {
            console.log(booking);
            const saleDate = new Date(booking.paymentDate);
            console.log(saleDate)
            const month = saleDate.getMonth();
            const monthly = month+1;
            console.log(monthly)
            const actualAmount = booking.amount;
            monthlyTotals[monthly] += actualAmount;
            console.log(monthlyTotals[month+1]);
          });
          // console.log(monthlyTotals);
          //this.dataSource[0] = this.schemeReceipts[i].schemeCustomerReceipt.customerName;
          this.dataSource.push(monthlyTotals);

         
        })
      }
   }

   public onSchemeSelectionChange(schemeId : any){
    this.service.getScheme(schemeId, (data : any)=>{
       this.scheme = data;
       this.service.getAllSchemeReceiptsByScheme(this.scheme.schemeId,(data : any)=>{
          console.log(data);
          this.schemeReceipts = data;
          this.getByCustomerName();
       })
    })
   }

  ngOnInit(): void {
    
  }

}
