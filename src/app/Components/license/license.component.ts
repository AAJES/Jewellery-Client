import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { License } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent {

  license : License = {
    licenseId: 0,
    nextRenewalDate: '',
    amountPaid: 0,
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    licenseType: '',
    code: '',
    yearMonth: ''
  }

  constructor(private httpClient : HttpClient,private service : MainService){

  }


   licenseform = new FormGroup({
    nextRenewalDate : new FormControl('',[Validators.required]),
    amountPaid : new FormControl('',[Validators.required]),
    licenseType : new FormControl('',[Validators.required]),
    code : new FormControl('',[Validators.required]),
    yearMonth : new FormControl('',[Validators.required])
  });

  public get nextRenewalDate(): FormControl{
    return this.licenseform.controls.nextRenewalDate.get('nextRenewalDate') as FormControl;
  }

  public get amountPaid(): FormControl{
    return this.licenseform.controls.amountPaid.get('amountPaid') as FormControl;
  }

  public get licenseType(): FormControl{
    return this.licenseform.controls.licenseType.get('licenseType') as FormControl;
  }

  public get code(): FormControl{
    return this.licenseform.controls.code.get('code') as FormControl;
  }

  public get yearMonth(): FormControl{
    return this.licenseform.controls.yearMonth.get('yearMonth') as FormControl;
  }

  public onSubmit(){
      
      this.license.nextRenewalDate = this.nextRenewalDate.value;
      this.license.amountPaid = this.amountPaid.value;
      this.license.licenseType = this.licenseType.value;
      this.license.code = this.code.value;
      this.license.yearMonth = this.yearMonth.value;

      // this.httpClient.post("http://localhost:5050/license",this.license)
      //                .subscribe((data : any)=>{
      //                   console.log(data);
      //                })

      this.service.addLicense(this.license,(data : any)=>{
           console.log(data);
      })
  }

}
