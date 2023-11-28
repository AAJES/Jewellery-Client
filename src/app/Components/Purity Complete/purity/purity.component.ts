import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Purity } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purity',
  templateUrl: './purity.component.html',
  styleUrls: ['./purity.component.css']
})
export class PurityComponent {

Purity : FormGroup | any; 


  

  purity : Purity = {
    purityId: 0,
    purityName: ''
  }

  puritys : Purity = {
    purityId: 0,
    purityName: ''
  }

  constructor(private httpClient : HttpClient,private service : MainService,private route : ActivatedRoute){

  }

  purityId : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.purityId = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         if(this.purityId == undefined){
          this.puritys = {
            purityId: 0,
            purityName: '-'
          }
         }
         else{
          this.service.getPurity(this.purityId,(data : any)=>{
            this.puritys = data;
         })
         }
         
    }

    )
}



  purityform = new FormGroup({
    purityName : new FormControl('',[Validators.required])
  });

  public get purityName(): FormControl{
    return this.purityform.controls.purityName.get('purityName') as FormControl;
  }

  public onSubmit(){
      // this.httpClient.post("http://localhost:5050/purity",this.purityName.value)
      //                .subscribe((data : any)=>{
      //                    console.log(data);
      //                })
      if(this.purityId == null){
        this.service.addPurity(this.purity,(data : any)=>{
          console.log(data);
      })
      }
      else{
         this.service.updatePurity(this.purityId,this.purity,(data : any)=>{
            console.log(data);
         })
      }
      
  }



}
