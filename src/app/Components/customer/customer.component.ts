import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  genders : any[] = [];
  customer : Customer = {
    customerId: 0,
    customerName: '',
    gender: {
      genderId: 0,
      gender: ''
    },
    phone1: '',
    phone2: '',
    email: '',
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    location: ''
  }

  constructor(private httpClient : HttpClient,private service : MainService){
      this.service.getAllGender((data : any)=>{
          this.genders = data;
      })
  }

  customerform = new FormGroup({
    customerName : new FormControl('',[Validators.required]),
    phone1 : new FormControl('',[Validators.required]),
    phone2 : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required])
  });

  public get customerName(): FormControl{
    return this.customerform.controls.customerName.get('customerName') as FormControl;
  }

  public get email(): FormControl{
    return this.customerform.controls.email.get('email') as FormControl;
  }

  public get phone1(): FormControl{
    return this.customerform.controls.phone1.get('phone1') as FormControl;
  }

  public get phone2(): FormControl{
    return this.customerform.controls.phone2.get('phone2') as FormControl;
  }

  public onGenderSelectionChange(genderId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/gender/"+genderId)
    //                 .subscribe((data : any)=>{
    //                      this.customer.gender = data;
    //                 })
      this.service.getGender(genderId,(data : any)=>{
          this.customer.gender = data;
      })
  }

  
  public onSubmit(){

    //  this.customer.customerName = this.customerName.value;
    //  this.customer.email = this.email.value;
    //  this.customer.phone1 = this.phone1.value;
    //  this.customer.phone2 = this.phone2.value;

    //  this.httpClient.post("http://localhost:5050/customer",this.customer)
    //                 .subscribe((data : any)=>{
    //                      console.log(data);
    //                 })

    this.service.addCustomer(this.customer,(data : any)=>{
        console.log(data);
    })
  }

}
