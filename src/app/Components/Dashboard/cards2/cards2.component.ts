import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-cards2',
  templateUrl: './cards2.component.html',
  styleUrls: ['./cards2.component.css']
})
export class Cards2Component {

  customer: any[] = [];
  return: any[] = [];
  booking: any[] = [];
  sales: any[] = [];
  productPurchase: any[] = [];
  totalReturn : number = 0;
  totalBooking : number = 0;
  totalSale : number = 0;
  totalProductPurchase : number = 0;
  totalTransaction : number = 0;
  fromDate : string = '';
  toDate : string = '';
  

  constructor(private http: MainService) { 
    this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
  }

  ngOnInit(): void {

    this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
    console.log(this.totalTransaction);
    
    this.http.getCustomerById((value: any) => {
      this.customer = value;
      // console.log(this.customer);
    })

    this.http.getReturn((val: any[]) => {
      this.return = val;
      // console.log(val);
      this.totalReturn = val.length
      console.log(this.totalReturn);
      this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
    console.log(this.totalTransaction);
      
    })

    this.http.getBooking((val: any[]) => {
      this.booking = val;
      // console.log(val);
      this.totalBooking = val.length;
      console.log(this.totalBooking);
      this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
    console.log(this.totalTransaction);
    })

    this.http.getSale((val: any[]) => {
      this.sales = val;
      // console.log(val);
      this.totalSale = val.length;
      console.log(this.totalSale);
      this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
    console.log(this.totalTransaction);
    })

    this.http.getProductPurchase((val: any[]) => {
      this.productPurchase = val;
      // console.log(val);
      this.totalProductPurchase = val.length;
      console.log(this.totalProductPurchase);
      this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
    console.log(this.totalTransaction);
      
      
    })

    

    
    
  }

  public getFromDateToDate(){
     this.http.getBookingFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
        this.booking = data;
        console.log(this.booking);
        this.totalBooking = data.length;
        this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
        console.log(this.totalTransaction);
     })

     this.http.getReturnFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
        this.return = data;
        console.log(this.return);
        this.totalReturn = data.length;
        this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
        console.log(this.totalTransaction);
     })

     this.http.getSalesFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
        this.sales = data;
        console.log(this.sales);
        this.totalSale = data.length;
        this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
        console.log(this.totalTransaction);
     })

     this.http.getProductPurchaseFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
        this.productPurchase = data;
        console.log(this.productPurchase)
        this.totalProductPurchase = data.length;
        this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
        console.log(this.totalTransaction);
     })

    
  }

  showTotalTransaction = false;

  // Function to toggle the visibility of the div
  toggleTotalTransaction() {
    this.showTotalTransaction = !this.showTotalTransaction;
    this.showTotalSale = false;
    this.showTotalBooking = false;
  }


  showTotalSale = false;

  // Function to toggle the visibility of the div
  toggleTotalSale() {
    this.showTotalSale = !this.showTotalSale;
    this.showTotalTransaction = false;
    this.showTotalBooking = false;
  }


  showTotalBooking = false;

  // Function to toggle the visibility of the div
  toggleTotalBooking() {
    this.showTotalBooking = !this.showTotalBooking;
    this.showTotalTransaction = false;
    this.showTotalSale = false;
    this.showTotalProductPurchase = false;
    this.showTotalReturn = false;
  }


  showTotalProductPurchase = false;

  // Function to toggle the visibility of the div
  toggleTotalProductPurchase() {
    this.showTotalProductPurchase = !this.showTotalProductPurchase;
    this.showTotalTransaction = false;
    this.showTotalSale = false;
    this.showTotalBooking = false;
    this.showTotalReturn = false;
  }




  showTotalReturn = false;

  // Function to toggle the visibility of the div
  toggleTotalReturn() {
    this.showTotalReturn = !this.showTotalReturn;
    this.showTotalTransaction = false;
    this.showTotalSale = false;
    this.showTotalBooking = false;
    this.showTotalProductPurchase = false;
  }


}
