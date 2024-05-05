import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-all-owners',
  templateUrl: './all-owners.component.html',
  styleUrls: ['./all-owners.component.css']
})
export class AllOwnersComponent {
  displayedColumns: string[] = ['ownerId', 'ownerName', 'phone','action'];
  ownerList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService , private router:Router) {
   
    this.service.getAllOwner((response: any) => {
      this.ownerList = response;
      this.dataSource = new MatTableDataSource(this.ownerList);
      this.dataSource.paginator = this.paginator;
    });
  }

  public onEditClick(ownerId : any) {
    console.log(ownerId)
    this.router.navigate(['/owner', { data:ownerId }]);
   }
}
