import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rateall',
  templateUrl: './rateall.component.html',
  styleUrls: ['./rateall.component.css']
}) 
export class RateallComponent {
  displayedColumns: string[] = ['rateId','metal','purity', 'ratePerGram','trDate','activeStatus'];
  rateList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private service: MainService) {
    this.service.getAllRate((response: any) => {
        response.reverse();
        this.rateList = response;
        this.dataSource = new MatTableDataSource(this.rateList);
        this.dataSource.paginator = this.paginator;
    });
}


}
