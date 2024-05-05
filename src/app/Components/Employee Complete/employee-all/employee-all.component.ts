import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-employee-all',
  templateUrl: './employee-all.component.html',
  styleUrls: ['./employee-all.component.css']
})
export class EmployeeAllComponent {
  displayedColumns: string[] = ['employeeId', 'employeeName', 'age', 'phoneNumber' , 'address' , 'gender' ,'action'];
  employeeList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService,private router:Router) {
   
    this.service.getAllEmployee((response: any) => {
      console.log(response)
      this.employeeList = response;
      this.dataSource = new MatTableDataSource(this.employeeList);
      this.dataSource.paginator = this.paginator;
    });
  }

  public onEditClick(employeeId : any) {
    console.log(employeeId)
    this.router.navigate(['/employeeform', { data:employeeId }]);
   }
}
