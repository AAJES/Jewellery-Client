import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';
import { Booking } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
    
  Sales : FormGroup | any;
  //service: any;

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
      Address: '',
      gender: {
        genderId: 0,
        gender: ''
      }
    },
    products: [],
    status: '',
    deductAmount: 0,
    refundAmount: 0,
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    }
  }
    

    constructor(private formBuilder : FormBuilder,private service : MainService,private route : ActivatedRoute){
        // this.Sales = this.formBuilder.group({
            
        // })
        this.service.getAllIdForm((data : any)=>{
          this.idForms = data;
          this.service.getuserbyId(data[data.length-1].id,(data : any)=>{
            console.log(data);
            this.Sales.user = data;
        })
      })
    }

    bookingId : any = 0;
    userId : any = 0;
    idForms : any[] = [];


    ngOnInit(){
      this.route.paramMap.subscribe(params =>{
           this.bookingId = params.get('data');
           //this.updateCompanyProcess(this.entity_id);
           this.service.getBookingById(this.bookingId,(data : any)=>{
                this.booking = data;
                // const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
                // console.log(sessionData);
                // this.userId = sessionData.userId;
                // this.service.getuserbyId(sessionData.userId,(data : any)=>{
                //   console.log(data);
                //   this.Sales.user = data;
                // })
           })
      }

      )
  }
}
