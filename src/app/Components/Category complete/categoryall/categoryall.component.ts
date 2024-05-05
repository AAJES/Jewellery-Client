import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoryall',
  templateUrl: './categoryall.component.html',
  styleUrls: ['./categoryall.component.css']
})
export class CategoryallComponent {
 

  displayedColumns: string[] = ['categoryId', 'categoryName', 'activeStatus','action'];
  categoryList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService,private router:Router) {
   
    this.service.getAllCategory((response: any) => {
      console.log('getAllCategory response:',response)
      this.categoryList = response;
      this.dataSource = new MatTableDataSource(this.categoryList);  
      this.dataSource.paginator = this.paginator;
    });
  }

  editItem(element: any) {
    // Implement edit logic here
    console.log('Edit item:', element);
    this.router.navigate(['/category', { data: element.categoryId }]);
  }
}
