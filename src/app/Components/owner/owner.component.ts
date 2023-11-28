import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { Owner } from 'src/app/commons/common.objects';
import { LoginComponent } from 'src/app/login/login.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  //Owner : FormGroup | any;
  //service: any;

  owner : Owner = {
    ownerId: 0,
    phone: '',
    password: '',
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    ownerName: ''
  }
      

    constructor(private service : MainService,@Inject(MAT_DIALOG_DATA) public data: LoginComponent,
    public dialogRef: MatDialogRef<OwnerComponent>){
        
        
    }

    public onSubmit(){
      // if(this.Owner == null){
      //   this.service.addowner(this.Owner,(response : any)=>{
      //     console.log(response);
      // })
      // }
      // else{
      //    this.service.updateowner(this.Owner,this.Owner,(data : any)=>{
      //       console.log(data);
      //    })
      // }
      this.service.addOwner(this.owner,(data : any)=>{
         console.log(data);
         
      })
      
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
