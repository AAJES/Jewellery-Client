import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allbankdetails',
  templateUrl: './allbankdetails.component.html',
  styleUrls: ['./allbankdetails.component.css']
})
export class AllbankdetailsComponent {
  displayedColumns: string[] = ['bankDetailsId', 'accountHolderName','accountNo','ifsccode', 'branch','description','active','action'];
  bankDetailsList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private service: MainService,private router: Router) {
    this.service.getAllBankDetails((response: any) => {
        response.reverse();
        this.bankDetailsList = response;
        this.dataSource = new MatTableDataSource(this.bankDetailsList);
        this.dataSource.paginator = this.paginator;
    });
}

 public onEditClick(bankDetailsId : any) {
  this.router.navigate(['/bankDetailsform', { data:bankDetailsId }]);
 }


  public onDeleteClick(bankDetailsId : any) {
    if (confirm("Are you sure to delete the Bank Details ?")){
     
        
  }}


}
