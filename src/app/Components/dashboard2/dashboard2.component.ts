import {  Component, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import * as Chart from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ChartComponent,ApexOptions } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component {




chartOptions = {
	  animationEnabled: true,
	  theme: "white",
	  exportEnabled: true,
	  title: {
		  text: "Return Chart"
      
	  },
	 
	  data: [{
      
		  type: "doughnut", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "jan", y: 9.1 },
		  	{ name: "Feb", y: 3.7 },
		  	{ name: "March", y: 36.4 },
		  	{ name: "April ", y: 30.7 },
		  ]
	  }]
	}




  chartOptions1 = {
	  animationEnabled: true,
	  theme: "white",
	  exportEnabled: true,
	  title: {
		  text: "Sales Chart"
      
	  },
	 
	  data: [{
      
		  type: "area", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "jan", y: 9.1 },
		  	{ name: "Feb", y: 3.7 },
		  	{ name: "March", y: 36.4 },
		  	{ name: "April ", y: 30.7 },
		  ]
	  }]
	}


 
  


















  bookings : any[] = [];
  pendingsBookings : any[] = [];
  payments : any[] = [];
  pendingPayments : any[] = [];
  returns : any[] = [];
  returnsThen : any[] = [];
  sales : any[] = [];
  salesThen : any[] = [];
  customer: any[] = [];
  return: any[] = [];
  booking: any[] = [];
  //sales: any[] = [];
  productPurchase: any[] = [];
  totalReturn : number = 0;
  totalBooking : number = 0;
  totalSale : number = 0;
  totalProductPurchase : number = 0;
  totalTransaction : number = 0;
  fromDate : string = '';
  toDate : string = '';


  constructor(private service : MainService,private dialog:MatDialog){
      this.getAllBookingsOnThatDay();
      this.getAllPaymentsOnThatDay();
      this.getAllReturns();
      this.getAllSales();
      this.getAllPendingPayments();
      this.getAllBookingsTodayAndTomorrow();
      this.getAllSalesOnThatDay();








     






   
  }

  openDialog(dialogData: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public getAllBookingsOnThatDay(){
    this.service.getAllBooking((data : any)=>{
        this.bookings = data;
    })
  }

  public getAllPaymentsOnThatDay(){
    this.service.getPaymentsOnThatday((data : any)=>{
         this.pendingPayments = data;
    })
  }

  public getAllPendingPayments(){
    this.service.getAllPendingPayments((data : any)=>{
       console.log(data);
       this.payments = data;
    })
  }

  public getAllBookingsTodayAndTomorrow(){
    this.service.getAllBookingbyBooked((data : any)=>{
       console.log(data)
       this.pendingsBookings = data;
    })
  }


  returnAmount : any[] = [];

  public getAllReturnsOnThatDay(){
    this.service.getAllReturn((data : any)=>{
        this.returns = data;
    })
  }

  public getAllReturns(){
    this.service.getAllReturns((data : any)=>{
          this.returns = data;
          console.log(data);
          if (this.returns != null) {
            for (let i = 0; i < this.returns.length; i++) {
              this.returnAmount.push(this.returns[i].returnAmount);
            }
            // console.log(this.returnAmount);
            this.RenderReturnsPieChart(this.returnAmount);
          }
     })
  }

  RenderReturnsPieChart(data: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlyReturnsTotals();
    // const monthlyTotals: number[] = [100, 200, 150, 300, 250, 180, 220, 170, 210, 290, 320, 280];
  
    // Ensure the previous chart is destroyed before creating a new one
    const canvas = document.getElementById('doughnut') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
  
    // Destroy the existing chart
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    let chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: months,
        datasets: [{
          label: 'Returns',
          data: monthlyTotals,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(50, 205, 50, 1)',
            'rgba(0, 128, 128, 1)',
            'rgba(218, 112, 214, 1)',
            'rgba(128, 112, 165, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(200, 192, 192, 1)'
          ],
          borderColor: ["white"],
          borderWidth: 3,
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Returns Chart',
            font: {
              size: 16
            }
          }
        }
      }
    });
  }



  
  displayedColumns = ['id', 'wastage', 'grossWeight', 'netWeight', 'returnAmount', 'description'];

  


  calculateMonthlyReturnsTotals(): number[] {
    const monthlyTotals: number[] = new Array(12).fill(0);
    
    
    this.returns.forEach((r) => {
      const returnDate = new Date(r.trdate);
      
      const month = returnDate.getMonth();
      const actualAmount = r.returnAmount;
      // Check month
      
      monthlyTotals[month] += actualAmount;
    });
  
  
    return monthlyTotals;
  }
  

  
  actualAmount: any[] = [];
  

  public getAllSales(){
    this.service.getAllSales((data : any)=>{
           this.sales = data;
           console.log(data);
           if (this.sales != null) {
            for (let i = 0; i < this.sales.length; i++) {
              this.actualAmount.push(this.sales[i].amountPaid);
            }
    
            // console.log(this.weight);
           
            this.RenderSalesPieChart(this.actualAmount);
          }
    })
  }

  public getAllSalesOnThatDay(){
      this.service.getAllSalesOnThatDay((data : any)=>{
          this.sales = data;
      })
  }

  RenderSalesPieChart(data: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlySalesTotals(); 
  
    // Get canvas element for the sales chart
    const canvas = document.getElementById('doughnut1') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
  
    // Destroy the existing chart
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // Render the sales chart
    let chart = new Chart(context!, {
      type: 'doughnut',
      data: {
        labels: months,
        datasets: [{
          label: 'Sales',
          data: monthlyTotals,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(50, 205, 50, 1)',
            'rgba(0, 128, 128, 1)',
            'rgba(218, 112, 214, 1)',
            'rgba(128, 112, 165, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(200, 192, 192, 1)'
          ],
          borderColor: ["black"],
          borderWidth: 3,
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Sales Chart', // Corrected title
            font: {
              size: 16
            }
          }
        }
      }
    });
  }
  

  calculateMonthlySalesTotals(): number[] {
    const monthlyTotals: number[] = new Array(12).fill(0);
    
    console.log('monthlyTotals:', monthlyTotals);
  
    this.sales.forEach((sale) => {
      const saleDate = new Date(sale.trdate);
      const month = saleDate.getMonth();
      const actualAmount = sale.amountPaid;
  
      console.log('Sale Date:', saleDate);
      console.log('Month:', month);
      console.log('Actual Amount:', actualAmount);
  
      monthlyTotals[month] += actualAmount;
    });
  
    console.log('Monthly Totals:', monthlyTotals);
  
    return monthlyTotals;
  }
  

  public getFromDateToDate(){
    this.service.getBookingFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
       this.bookings = data;
       console.log(this.bookings);
       this.totalBooking = data.length;
       this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
       console.log(this.totalTransaction);
    })

    this.service.getReturnFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
       this.returns = data;
       console.log(this.return);
       this.totalReturn = data.length;
       this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
       console.log(this.totalTransaction);
       if (this.returns != null) {
        for (let i = 0; i < this.returns.length; i++) {
          this.returnAmount.push(this.returns[i].returnAmount);
        }
        // console.log(this.returnAmount);
        this.RenderReturnsPieChart(this.returnAmount);
      }
    })

    this.service.getSalesFromDateToDate(this.fromDate,this.toDate,(data : any)=>{
       this.sales = data;
       console.log(this.sales);
       this.totalSale = data.length;
       this.totalTransaction = this.totalBooking + this.totalProductPurchase + this.totalReturn + this.totalSale;
       console.log(this.totalTransaction);
       if (this.sales != null) {
        for (let i = 0; i < this.sales.length; i++) {
          this.actualAmount.push(this.sales[i].amountPaid);
        }

        // console.log(this.weight);
       
        this.RenderSalesPieChart(this.actualAmount);
      }
    })


    this.calculateMonthlyReturnsTotals();
    this.calculateMonthlySalesTotals();
   
 }


}
