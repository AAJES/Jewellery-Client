import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-totaltransaction2',
  templateUrl: './totaltransaction2.component.html',
  styleUrls: ['./totaltransaction2.component.css']
})
export class Totaltransaction2Component {

  customer: any[] = [];
  return: any[] = [];
  booking: any[] = [];
  sales: any[] = [];
  productPurchase: any[] = [];
  totalReturn: number = 0;
  totalBooking: number = 0;
  totalSale: number = 0;
  totalProductPurchase: number = 0;
  totalTransaction: number = 0;
  bookingAmount: number = 0;
  returnAmount: number = 0;
  salesAmount: number = 0;
  productPurchaseAmount: number = 0;
  data : any[] = [];
  RecentsStack: any[] = [];
  count: number = 1;

  constructor(private http: MainService) { }

  ngOnInit(): void {

    this.http.getCustomerById((value: any) => {
      this.customer = value;
    })

    this.http.getReturn((val: any[]) => {
      this.totalReturn = val.length;
      this.returnAmount = val.reduce((s, amount) => s + amount.returnAmount, 0)
    })

    this.http.getBooking((val: any[]) => {
      this.totalBooking = val.length;
      this.bookingAmount = val.reduce((s, amount) => s + amount.advanceAmount, 0);
    })

    this.http.getSale((val: any[]) => {
      this.totalSale = val.length;
      this.salesAmount = val.reduce((s, amount) => s + amount.actualAmount, 0);
    })

    this.http.getProductPurchase((val: any[]) => {
      this.totalProductPurchase = val.length;
      this.productPurchaseAmount = val.reduce((s, amount) => s + amount.amountPaid, 0);
      // console.log(this.bookingAmount);
      // console.log(this.productPurchaseAmount);
      // console.log(this.returnAmount);
      // console.log(this.salesAmount);
      this.data = [this.salesAmount, this.productPurchaseAmount, this.returnAmount, this.bookingAmount];
      // console.log(this.data);
      this.RenderLineChart(this.data);
      this.RenderPieChart(this.data);
    })
  }

  RenderLineChart(data : any) {
    let chart = new Chart('linechart', {
      type: 'bar',
      data: {
        labels: ['Sales', 'Product purchase', 'Return', 'Booking'],
        datasets: [{
          label: 'All transaction',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          // y: {
          //   beginAtZero: true,
          // }
        }
      }
    });
  }


  RenderPieChart(data :any) {
    let chart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ['Sales', 'Product purchase', 'Return', 'Booking'],
        datasets: [{
          label: 'All transaction',
          data: data,
          backgroundColor: [
            'rgba(230, 126, 34, 1)',
            'rgba(155, 89, 182, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(52, 152, 219, 1)'
          ],
          borderColor: [
            "white",
          ],
          borderWidth: 3,
        }]
      }
    });
  }

  pushToStack() {
    if (this.count > 10) {
      this.RecentsStack.splice(0, 1);
    }
    this.RecentsStack.push("pushed " + this.count++);
  }

}
