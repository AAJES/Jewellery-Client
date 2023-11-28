import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service : MainService,private route : ActivatedRoute){
    // console.log(this.valid);
    //      const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
    //       console.log(sessionData);
    //       this.userId = sessionData.userId;
    //       this.service.getAllIdForm((data : any)=>{
    //           this.idForms = data;
    //           this.service.getuserbyId(this.userId,(data:any)=>{
    //               this.valid = true;
    //               console.log(this.valid);
    //           })
    //       })

  }

  userId:any=0;
  user:user={
    userId: 0,
    userName: '',
    password: '',
    role: []
  }

  valid : boolean = false;
  usersId : any = 0;
  idForms : any[] = [];

  ngOnInit(){
    console.log('aaaaaaaaaaaaaaaaaasssssssssssssssssssssssssss');
    this.route.paramMap.subscribe(params =>{
         this.userId = params.get('data');
         console.log(this.valid);
         const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
          console.log(sessionData);
          this.userId = sessionData.userId;
          // this.service.getAllIdForm((data : any)=>{
          //     this.idForms = data;
          //     this.service.getuserbyId(this.userId,(data:any)=>{
          //         this.valid = true;
          //         console.log(this.valid);
          //     })
          // })
          this.service.getuserbyId(sessionData.userId,(data : any)=>{
            console.log(data);
          })
         console.log(this.usersId);
         if(this.usersId){
          console.log(this.userId);
          this.valid = true;
          console.log(this.valid);
        }
         //this.parentmessage = this.userId;
         console.log(this.userId);
        //  this.service.get("http://localhost:5050/asm/assetDetails/assetCode/"+this.assetCode)
        //              .subscribe((data : any)=>{
        //                 console.log(data);
        //                 this.scrap.assetDetails = data;
        //              })
         //this.updateCompanyProcess(this.entity_id);
         localStorage.setItem('sessionData', JSON.stringify({ userId: JSON.stringify(this.userId) }));
         console.log(JSON.parse(localStorage.getItem('sessionData')as string))
         this.service.getuserbyId(this.userId,(data : any)=>{
             console.log(data);
             this.user = data;
            // this.roles = this.user.roles;
             //console.log(this.user.roles.description)
            //  for(let i = 0;i<this.roles.length;i++){
            //   console.log(this.roles);
            //  if(this.roles[i].description == "Admin"){
            //     console.log(this.roles[i].description);
            //     this.admin = true;
            //  }
            //  if(this.roles[i].description == "Employee"){
            //     this.employee = true;
            //  }
            // } 
         })
    }
  
    )
  }
  
  title = 'angularProj2';
  sideNavStatus: boolean = false;


  public isLoggedIn(): boolean {
    return this.service.isAuthenticated();
  }
}
