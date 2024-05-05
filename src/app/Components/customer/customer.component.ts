import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/commons/common.objects';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
  customerId: any=0;

 

 

  constructor(private service : MainService, private router : Router,private route:ActivatedRoute){
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

      this.service.getGender(genderId,(data : any)=>{
          this.customer.gender = data;
      })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const customerId = params.get("data");
      console.log(customerId);
      if (customerId) {
        
        this.customerId = customerId;

        this.service.getCustomer(customerId, (data: any) => {
          console.log(data);
          this.customer = data;
        });
      } else {
        // Handle the case where bookingId is not available
      }
    });
  }

  public onSubmit() {
    


    if(this.customerId == 0){
      this.service.addCustomer(this.customer,(data : any)=>{
        console.log(data);
       
        this.router.navigate(["/allcustomers"]);
      });
    }else{
      this.service.updateCustomer(this.customerId,this.customer,(data:any)=>{
        console.log("Update Successful")
        this.router.navigate(['/allcustomers']);
      })
    }
  }
  
  

}
