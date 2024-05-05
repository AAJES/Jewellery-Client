import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopall',
  templateUrl: './shopall.component.html',
  styleUrls: ['./shopall.component.css']
})
export class ShopallComponent {
  displayedColumns: string[] = ['shopId', 'shopName', 'logo','bankDetails', 'address', 'email', 'state', 'gstNo', 'panNo','action'];
  categoryList : any[] = [];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  constructor(private service: MainService,private router : Router) {
   
    this.service.getAllShop((response: any) => {
      console.log(response)
      this.categoryList = response;
      this.dataSource = new MatTableDataSource(this.categoryList);
      this.dataSource.paginator = this.paginator;
    });
  } 

  public edit(id:any){
    this.router.navigate(['/shop', { data: id }]);
  }
}