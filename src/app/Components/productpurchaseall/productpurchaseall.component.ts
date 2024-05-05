import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productpurchaseall',
  templateUrl: './productpurchaseall.component.html',
  styleUrls: ['./productpurchaseall.component.css']
})
export class ProductpurchaseallComponent {
  displayedColumns: string[] = ['productPurchaseId','product', 'totalWeight', 'amountPaid', 'quantity'];
  productPurchaseList : any[] = [];
  dataSource!: MatTableDataSource<any>;
  productArr: any[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService , private router:Router) {
   
    this.service.getAllProductPurchase((response: any) => {
      console.log(response)
      this.productPurchaseList = response;
      this.dataSource = new MatTableDataSource(this.productPurchaseList);
      this.dataSource.paginator = this.paginator;
      
    });
  }

}
