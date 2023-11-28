import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Metal } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-metal',
  templateUrl: './metal.component.html',
  styleUrls: ['./metal.component.css']
})
export class MetalComponent {

  metal : Metal = {
    metalId: 0,
    metalName: '-'
  }

  metall : Metal = {
    metalId: 0,
    metalName: ' '
  }

  constructor(private service : MainService,private route : ActivatedRoute){

  }

  metalId : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.metalId = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         console.log(this.metalId);
         if(this.metalId == null){
           this.metall = {
            metalId: 0,
            metalName: ' '
           };
         }else{
          this.service.getMetal(this.metalId,(data : any)=>{
            this.metall = data;
         })
         }
    }

    )
}

  metalform = new FormGroup({
    metalName : new FormControl('',[Validators.required])
  });

  public get metalName(): FormControl{
    return this.metalform.controls.metalName.get('metalName') as FormControl;
  }

  public onSubmit(){
    if(this.metalId == null){
      this.service.addMetal(this.metal,(response : any)=>{
        console.log(response);
    })
    }
    else{
       this.service.updateMetal(this.metalId,this.metal,(data : any)=>{
          console.log(data);
       })
    }
    
  }

}

