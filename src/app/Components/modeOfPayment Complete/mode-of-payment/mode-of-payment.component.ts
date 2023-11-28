import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeOfPayment } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';

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

  constructor(private httpClient : HttpClient,private service : MainService){

  }

  modeofpaymentform = new FormGroup({
    modeofPayment : new FormControl('',[Validators.required])
  });

  public get modeOfPayment(): FormControl{
    return this.modeofpaymentform.controls.modeofPayment.get('modeOfPayment') as FormControl;
  }

  public onSubmit(){

    // this.mop.modeOfpayment = this.modeOfPayment.value;

    // this.httpClient.post("http://localhost:5050/modeofpayment",this.mop)
    //                .subscribe((data : any)=>{
    //                   console.log(data);
    //                })
    
    this.service.addModeOfPayment(this.mop,(data : any)=>{
        console.log(data);
    })

  }


}
