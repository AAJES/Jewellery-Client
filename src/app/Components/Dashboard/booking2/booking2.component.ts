import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-booking2',
  templateUrl: './booking2.component.html',
  styleUrls: ['./booking2.component.css']
})
export class Booking2Component implements OnInit{

  bookings: any[] = [];
  date: any[] = [];
  minAmount: any[] = [];
  advanceAmount: any[] = [];
  tableSource = new MatTableDataSource();

  constructor(private service: MainService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {
    this.tableSource.sort = this.sort;
    this.tableSource.paginator = this.paginator;
    // console.log(this.date);
    // console.log(this.actualAmount);
  }

  getData() {
    this.service.getBooking((val: any) => {
      this.bookings = val;
      this.tableSource.data = this.bookings

      if (this.bookings != null) {
        for (let i = 0; i < this.bookings.length; i++) {
          this.date.push(this.bookings[i].deliveryDate);
          this.minAmount.push(this.bookings[i].minAmount);
          this.advanceAmount.push(this.bookings[i].advanceAmount)
        }
        // console.log(this.tableSource.data);
        this.RenderBarChart(this.advanceAmount);
        this.RenderPieChart(this.advanceAmount);
      }
    })
  }

  RenderBarChart(data: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlyTotals();
    // console.log(monthlyTotals);

    let chart = new Chart("barchart", {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Bookings',
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
          //   beginAtZero: true
          // }
        }
      }
    });
  }

  RenderPieChart(data: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals: number[] = this.calculateMonthlyTotals();
    // console.log(monthlyTotals);

    let chart = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: months,
        datasets: [{
          label: 'All transaction',
          data: monthlyTotals,
          backgroundColor: [
            'rgba(230, 126, 34, 1)',
            'rgba(155, 89, 182, 1)',
            'rgba(46, 204, 113, 1)',
            'rgba(52, 152, 219, 1)',
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

  displayedColumns = ['date', 'minAmount', 'advanceAmount'];

  calculateMonthlyTotals(): number[] {
    const monthlyTotals: number[] = new Array(12).fill(0);
    this.bookings.forEach((booking) => {
      console.log(booking);
      const saleDate = new Date(booking.deliveryDate);
      console.log(saleDate)
      const month = saleDate.getMonth();
      console.log(month)
      const actualAmount = booking.advanceAmount;
      monthlyTotals[month] += actualAmount;
      console.log(monthlyTotals[month]);
    });
    // console.log(monthlyTotals);
    return monthlyTotals;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();
  }


}
