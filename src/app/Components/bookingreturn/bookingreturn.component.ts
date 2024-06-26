import { Component } from '@angular/core';
import { Booking } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookingreturn',
  templateUrl: './bookingreturn.component.html',
  styleUrls: ['./bookingreturn.component.css']
})
export class BookingreturnComponent {

  booking : Booking = {
    bookingId: 0,
    minAmount: 0,
    deliveryDate: '',
    bookingDate: '',
    advanceAmount: 0,
    customer: {
      customerId: 0,
      customerName: '',
      gender: {
        genderId: 0,
        gender: ''
      },
      phone1: '',
      phone2: '',
      email: '',
      location: '',
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    },
    employee: {
      employeeId: 0,
      employeeName: '',
      age: 0,
      phoneNumber: '',
      address: '',
      gender: {
        genderId: 0,
        gender: ''
      }
    },

    status: '',
    deductAmount: 0,
    refundAmount: 0,
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    login: {
      loginId: 0,
      systemDetails: '',
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    },
    catalog: '',
    metal: {
      metalId: 0,
      metalName: ''
    },
    purity: {
      purityId: 0,
      purityName: ''
    },
    weight: 0,
    image: '',
    cancelDate: '',
    description: '',
    rate: {
      rateId: 0,
      trDate: '',
      trTime: {
        hours: 0,
        minutes: 0
      },
      activeStatus: false,
      ratePerGram: 0,
      metal: {
        metalId: 0,
        metalName: ''
      },
      purity: {
        purityId: 0,
        purityName: ''
      },
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    },
    quantity: '',
    category: {
      categoryId: 0,
      categoryName: "",
      activeStatus: false,
      categoryImage: ""
    },
    modeOfAdvance: '',
    oldMetalWeight: 0
  }

  constructor(private service : MainService,private route : ActivatedRoute){

  }

  bookingId : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.bookingId = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.service.getBookingById(this.bookingId,(data : any)=>{
              this.booking = data;
              console.log(this.booking);
              // this.products = this.booking.products;  
              // this.sales.quantity = this.products.length;
              // for(let i =0;i<this.products.length;i++){
              //     this.netWeight = this.netWeight + this.products[i].product.weightage;
              // }
              // this.sales.netWeight = this.netWeight;
              // this.service.getPaymentByBookingId(this.bookingId,this.payment,(data : any)=>{
              //     console.log(data);
              //     this.payment = data;
              // })
         })
    }

    )
}

public refundAmount(){
   this.booking.refundAmount = this.booking.advanceAmount - this.booking.deductAmount;
}

public updateBooking(){
   this.service.updateBooking(this.bookingId,this.booking,(data : any)=>{
      console.log(data);
   })
}

}
