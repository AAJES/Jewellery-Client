import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Chart from 'chart.js';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-return2',
  templateUrl: './return2.component.html',
  styleUrls: ['./return2.component.css']
})
export class Return2Component {

  returns : any[] = [];
  id : any[] = [];
  wastage : any[] = [];
  grossWeight : any[] = [];
  netWeight : any[] = [];
  description : any[] = [];
  returnAmount : any[] = [];
  trdate : any[] = [];
  tablesource = new MatTableDataSource();

  constructor(private service :MainService) {}

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
    this.service.getReturn((val: any) => {
      this.returns = val;
      this.tablesource.data = this.returns;
      // console.log(this.returns);
      if (this.returns != null) {
        for (let i = 0; i < this.returns.length; i++) {
          this.id.push(this.returns[i].returnId);
          this.wastage.push(this.returns[i].wastage);
          this.grossWeight.push(this.returns[i].grossWeight);
          this.netWeight.push(this.returns[i].netWeight);
          this.description.push(this.returns[i].description);
          this.returnAmount.push(this.returns[i].returnAmount);
          this.trdate.push(this.returns[i].trdate);
        }
        // console.log(this.returnAmount);
        this.RenderLineChart(this.returnAmount);
        this.RenderPieChart(this.returnAmount);
      }
    });
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
            'rgba(218, 112, 214, 1)',
          ],
          borderColor: [
            "white",
          ],
          borderWidth: 3,
        }]
      }
    });
  }
  displayedColumns = ['id', 'wastage', 'grossWeight', 'netWeight', 'returnAmount', 'description'];

  calculateMonthlyTotals(): number[] {
    const monthlyTotals: number[] = new Array(12).fill(0);
    this.returns.forEach((r) => {
      const saleDate = new Date(r.trdate);
      const month = saleDate.getMonth();
      const actualAmount = r.returnAmount;
      monthlyTotals[month] += actualAmount;
    });
    // console.log(monthlyTotals);
    return monthlyTotals;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tablesource.filter = filterValue.trim().toLowerCase();
  }

}
