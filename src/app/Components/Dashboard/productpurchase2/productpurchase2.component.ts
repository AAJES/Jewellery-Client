import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-productpurchase2',
  templateUrl: './productpurchase2.component.html',
  styleUrls: ['./productpurchase2.component.css']
})
export class Productpurchase2Component {

  productPurchase : any[] = [];
  id : any[] = [];
  date : any[] = [];
  weight : any[] = [];
  amount : any[] = [];
  time : any[] = [];
  tablesource = new MatTableDataSource();

  constructor(private service : MainService){}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {
    this.tablesource.sort = this.sort;
    this.tablesource.paginator = this.paginator
  }

  getData() {
    this.service.getProductPurchase((val: any) => {
      this.productPurchase = val;
      this.tablesource.data = this.productPurchase;
      // console.log(this.tablesource.data);
      
      
      if (this.productPurchase != null) {
        for (let i = 0; i < this.productPurchase.length; i++) {
          this.id.push(this.productPurchase[i].productPurchaseId);
          this.date.push(this.productPurchase[i].trDate);
          this.weight.push(this.productPurchase[i].totalWeight);
          this.amount.push(this.productPurchase[i].amountPaid);
          // this.time.push(this.productPurchase[i].trTime);
        }
        // console.log(this.id);
        this.RenderLineChart(this.amount);
        this.RenderPieChart(this.amount);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tablesource.filter = filterValue.trim().toLowerCase();
  }

  RenderLineChart(data :any) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlyTotals();
    // console.log(monthlyTotals);


    let chart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Product Purchase',
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
            'rgba(75, 192, 192, 1)'
          ],
          borderColor: [
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
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 3,
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

  RenderPieChart(data : any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlyTotals();
    // console.log(monthlyTotals);

    let chart = new Chart('doughnut', {
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
            'rgba(75, 192, 192, 1)'
          ],
          borderColor: [
            "white",
          ],
          borderWidth: 3,
        }]
      }
    });
  }

  displayedColumns = ['id', 'weight', 'amount', 'date'];

  calculateMonthlyTotals(): number[] {
    const monthlyTotals: number[] = new Array(12).fill(0);
    this.productPurchase.forEach((p) => {
      console.log(p.trDate);
      const saleDate = new Date(p.trDate);
      const month = saleDate.getMonth();
      const actualAmount = p.amountPaid;
      monthlyTotals[month] += actualAmount;
    });
    // console.log(monthlyTotals);
    return monthlyTotals;
  }

}
