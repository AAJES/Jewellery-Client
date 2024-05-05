import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modeall',
  templateUrl: './modeall.component.html',
  styleUrls: ['./modeall.component.css']
})
export class ModeallComponent {
  displayedColumns: string[] = ['modeOfPaymentId', 'modeOfPayment','action'];
  modeOfPaymentList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService , private router:Router) {
   
    this.service.getAllModeOfPayment((response: any) => {
      this.modeOfPaymentList = response;
      console.log(this.modeOfPaymentList)
      this.dataSource = new MatTableDataSource(this.modeOfPaymentList);
      console.log(this.dataSource)

      this.dataSource.paginator = this.paginator;
    });
  }

  public onEditClick(modeofPaymentId : any) {
    console.log(modeofPaymentId)
    this.router.navigate(['/paymentmode', { data:modeofPaymentId }]);
   }
  
  
    // public onDeleteClick(modeofPaymentId : any) {
    //   if (confirm("Are you sure to delete the Bank Details ?")){
    //     console.log('delete clicked',modeofPaymentId);
    //    this.service.deleteModeOfPayment(modeofPaymentId);
          
    // }}

}
