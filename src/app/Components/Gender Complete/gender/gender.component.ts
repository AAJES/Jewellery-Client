import { Component } from '@angular/core';
import { Gender } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent {

  gend : Gender = {
    genderId: 0,
    gender: ''
  }

  constructor(private service : MainService,private route : ActivatedRoute){

  }

  genderId : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.genderId = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         console.log(this.genderId);
         if(this.genderId == null){
           this.gend = {
            genderId: 0,
            gender: ''
           };
         }else{
          this.service.getGender(this.genderId,(data : any)=>{
             this.gend = data;
          })
         }
    }

    )
}

  public onSubmit(){
    this.service.addGender(this.gend,(data : any)=>{
        console.log(data);
    })
  }

}
