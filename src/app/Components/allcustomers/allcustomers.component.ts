import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.css']
})
export class AllcustomersComponent {
  displayedColumns: string[] = ['customerId', 'customerName', 'gender', 'phone1', 'phone2', 'email','action'];
  customerList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService , private router:Router) {
   
    this.service.getAllCustomer((response: any) => {
      this.customerList = response;
      this.dataSource = new MatTableDataSource(this.customerList);

      this.dataSource.paginator = this.paginator;
    });
  }

  public onEditClick(customerId : any) {
    this.router.navigate(['/customer', { data:customerId }]);
   }
}
