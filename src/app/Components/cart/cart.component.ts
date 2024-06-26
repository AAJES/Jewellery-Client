import { Component } from '@angular/core';
import { Cart } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  carts : any[] = [];
  products : any[] = [];
  bookings : any[] = [];

  
  constructor(private service : MainService,public dialog: MatDialog,private router : Router){
      // this.service.getAllBooking((data : any)=>{
      //     console.log(data);
      //     this.bookings = data;
      // })
      this.service.findAllBooking((data : any)=>{
          console.log(data);
          this.bookings = data;
      })
  }

  cart : Cart = {
    cartId: 0,
    totalCost: 0,
    quantity: 0,
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    products: [],
    booking: {
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
    }
  }

  // public openDialog(): void {
  //   this.service.openDialog();
  // }

  // closeDialog(): void {
  //   this.dialogRef.close();
  // }

  public generateBill(bookingId : number){
    this.router.navigate(['/payment', { data: bookingId  }]);
  }

  public removeBooking(bookingId : number){
     this.router.navigate(['/removebooking',{data : bookingId}]);
  }


  


  



}
