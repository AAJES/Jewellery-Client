import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { Scheme } from 'src/app/commons/common.objects';


@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})
export class SchemeComponent {
 scheme : Scheme = {
   schemeId: 0,
   schemeName: '',
   schemeAmount: 0,
   startDate: '',
   endDate: '',
   trDate: '',
   amountPerMonth: 0
 }



  constructor(private httpClient : HttpClient,private service : MainService,private route : ActivatedRoute){

  }

  public totalSchemeAmount( amt : number){
    this.scheme.schemeAmount = amt*12
  }


  public onSubmit() {
    this.service.addScheme(this.scheme, (data : any)=>{
      console.log(data);
      this.scheme = data;
    })
  }



}
