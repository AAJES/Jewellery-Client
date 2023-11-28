import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-bookingall',
  templateUrl: './bookingall.component.html',
  styleUrls: ['./bookingall.component.css']
})
export class BookingallComponent {
  displayedColumns: string[] = ['bookingId', 'minAmount' , 'deliveryDate' , 'advanceAmount' ];
  bookingList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllBooking((response : any)=>{
        this.bookingList = response;
    })
  }

}
