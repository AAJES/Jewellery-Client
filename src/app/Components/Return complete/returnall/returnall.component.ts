import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-returnall',
  templateUrl: './returnall.component.html',
  styleUrls: ['./returnall.component.css']
})
export class ReturnallComponent {
  displayedColumns: string[] = ['returnId', 'wastage', 'grossWeight', 'netWeight','description','returnAmount'];
  returnList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service : MainService){
    this.service.getAllReturn((response : any)=>{
    
        this.returnList = response;
        this.dataSource = new MatTableDataSource(this.returnList);
        this.dataSource.paginator = this.paginator;
    })
  }








}
