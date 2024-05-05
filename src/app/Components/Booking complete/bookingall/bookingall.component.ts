import { Component, ViewChild } from '@angular/core';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookingall',
  templateUrl: './bookingall.component.html',
  styleUrls: ['./bookingall.component.css']
})
export class BookingallComponent {
  booking:any

  



  displayedColumns: string[] = ['bookingId', 'customer', 'employee', 'deliveryDate' , 'minAmount' , 'advanceAmount'  ,'action'];
  bookingList : any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MainService , private router:Router,private snackBar: MatSnackBar) {
   
    this.service.getAllBookingbyBooked((response: any) => {
      this.bookingList = response;
      this.dataSource = new MatTableDataSource(this.bookingList);
      this.dataSource.paginator = this.paginator;
    });
  }

  public addBookingToProduct(bookingId: any) {
    this.router.navigate(['/product', { bookingId:bookingId }])
  }


  public onEditClick(bookingId : any) {
    console.log(bookingId)
    this.router.navigate(['/booking', { data:bookingId }]);
   }



    public cancelBooking(bookingId: any) {
    
    
    console.log(bookingId);
  


 



    const dialogRef = this.snackBar.open('Are you sure to Cancel the booking?', 'Confirm', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top", // Adjust the duration as needed
      panelClass: ['snackbar-style'], // Optional custom styles
    }); 
  
    dialogRef.afterDismissed().subscribe((result) => {
      if (result.dismissedByAction) {
        console.log('User confirmed the cancellation');
        this.router.navigate(['/booking', { data:bookingId }]);
      } else {
        console.log('User dismissed or closed the Snackbar');
      }
    });
  }
  

}
