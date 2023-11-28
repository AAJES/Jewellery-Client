import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-sales2',
  templateUrl: './sales2.component.html',
  styleUrls: ['./sales2.component.css']
})
export class Sales2Component {

  sales: any[] = [];
  date: any[] = [];
  totalAmount: any[] = [];
  discountAmount: any[] = [];
  actualAmount: any[] = [];
  id: any[] = [];
  weight: any[] = [];
  tablesource = new MatTableDataSource();

  constructor(private service: MainService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.tablesource.sort = this.sort;
    this.tablesource.paginator = this.paginator
  }

  getData() {
    this.service.getSale((val: any) => {
      this.sales = val;
      this.tablesource.data = this.sales;
      // console.log(this.sales);
      if (this.sales != null) {
        for (let i = 0; i < this.sales.length; i++) {
          this.date.push(this.sales[i].trDate);
          this.totalAmount.push(this.sales[i].totalAmount);
          this.discountAmount.push(this.sales[i].discountAmount);
          this.actualAmount.push(this.sales[i].actualAmount);
          this.id.push(this.sales[i].salesId);
          this.weight.push(this.sales[i].weight);
        }

        // console.log(this.weight);
        this.RenderLineChart(this.actualAmount);
        this.RenderPieChart(this.actualAmount);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tablesource.filter = filterValue.trim().toLowerCase();
  }


  displayedColumns = ['id', 'date', 'weight', 'totalAmount', 'discountAmount', 'actualAmount'];

  RenderLineChart(data :any) {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlyTotals();
    // console.log(monthlyTotals);


    let chart = new Chart('linechart', {
      type: 'line',

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

  calculateMonthlyTotals(): number[] {
    const monthlyTotals: number[] = new Array(12).fill(0);
    this.sales.forEach((sale) => {
      const saleDate = new Date(sale.trDate);
      const month = saleDate.getMonth();
      const actualAmount = sale.actualAmount;
      monthlyTotals[month] += actualAmount;
    });
    // console.log(monthlyTotals);
    return monthlyTotals;
  }

}
