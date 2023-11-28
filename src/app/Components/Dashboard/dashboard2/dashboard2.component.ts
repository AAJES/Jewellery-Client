import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component {

  Ppurchase!: any[];
  PID!: number;
  trdate!: number;
  trtime!: number;
  totalweight!: number;
  totalamount!: number;
  displayedColumns! :string[]

  constructor(private httpService: MainService) { }

  ngOnInit() {
    this.httpService.getProductPurchase((productPurchase: any[]) => {
      this.Ppurchase = productPurchase;
      // console.log(this.Ppurchase);
      

      this.Ppurchase.forEach((p) => {
        this.PID = p.productPurchasedId;
        // console.log(this.PID);
      })

      this.Ppurchase.forEach((p)=>{
        this.trdate = p.trDate;
        // console.log(this.trdate);
      })

      this.Ppurchase.forEach((p)=>{
        this.trtime = p.trTime;
        // console.log(this.trtime);
      })

      this.Ppurchase.forEach((p)=>{
        this.totalweight = p.totalWeight;
        // console.log(this.totalweight);
      })

      this.Ppurchase.forEach((p)=>{
        this.totalamount = p.amountPaid;
        // console.log(this.totalamount);
      })
    })
    this.displayedColumns =  ['PID', 'trdate', 'trtime', 'totalweight', 'totalamount'];
  }

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = {
    responsive: true,
  };

  public lineChartLegend = true;
  public lineChartType = 'line';

  // public getFromDateToDate(){
    //     this.http.getBookingFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
    //        this.booking = data;
    //        this.totalBooking = data.length;
    //     })
    
    //     this.http.getReturnFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
    //        this.return = data;
    //        this.totalReturn = data.length;
    //     })
    
    //     this.http.getSalesFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
    //        this.sales = data;
    //        this.totalSale = data.length;
    //     })
    
    //     this.http.getProductPurchaseFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
    //        this.productPurchase = data;
    //        this.totalProductPurchase = data.length;
    //     })
    
    //     this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
    //  }

}
