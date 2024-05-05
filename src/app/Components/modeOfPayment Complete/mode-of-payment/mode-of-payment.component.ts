import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeOfPayment } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mode-of-payment',
  templateUrl: './mode-of-payment.component.html',
  styleUrls: ['./mode-of-payment.component.css']
})
export class ModeOfPaymentComponent {

  mop : ModeOfPayment = {
    modeofPaymentId: 0,
    modeOfPayment: ''
  }
  modeOfPaymentId: any= 0;

  constructor(private service : MainService,private router:Router,private route : ActivatedRoute){

  }

  modeofpaymentform = new FormGroup({
    modeofPayment : new FormControl('',[Validators.required])
  });

  public get modeOfPayment(): FormControl{
    return this.modeofpaymentform.controls.modeofPayment.get('modeOfPayment') as FormControl;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const modeOfPaymentId = params.get("data");
      console.log(modeOfPaymentId);
      if (modeOfPaymentId) {
        // Edit Booking
      this.modeOfPaymentId = modeOfPaymentId;

        this.service.getModeOfPayment(modeOfPaymentId, (data: any) => {
          console.log(data);
          this.mop = data;
         
        });
      } else {
        // Handle the case where bookingId is not available
      }
    });
  }

  public onSubmit(){

  

    if(this.modeOfPaymentId == 0){
      this.service.addModeOfPayment(this.mop,(data : any)=>{
        console.log(data);
        this.router.navigate(['/allpaymentmode'])
    })
    }else{
      this.service.updateModeOfPayment(this.modeOfPaymentId,this.mop,(data:any)=>{
        console.log("Update Successful")
        this.router.navigate(['/allpaymentmode']);
      })
    }

  }


}
