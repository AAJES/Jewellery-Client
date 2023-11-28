import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { Rate } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent {

  users : any[] = [];
  metals : any[] = [];
  purities : any[] = [];
  userId: any;
  idForms : any[] = [];


  constructor(private service : MainService){
    

    this.service.getAllUser((data : any)=>{
      this.users = data;
   })

   this.service.getAllMetals((data : any)=>{
      console.log(data);
      this.metals = data;
   })

   this.service.getAllPurity((data : any)=>{
      this.purities = data;
   })

   this.service.getAllIdForm((data : any)=>{
      console.log(data);
      this.idForms = data;
      const length = data.length;
      const id = data[length-1].id;
      this.service.getUserById(id,(data : any)=>{
          console.log(data);
          this.rate.user = data;
      })
   })
   


  }

  rate : Rate = {
    rateId: 0,
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    activeStatus: false,
    ratePerGram: 0,
    metal: {
      metalId: 0,
      metalName: ''
    },
    purity: {
      purityId: 0,
      purityName: ''
    },
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    }
  }
  ngOnInit(){
    console.log("asdfgh");
    this.service.getAllIdForm((data : any)=>{
      this.service.getuserbyId(this.idForms[this.idForms.length-1].idFormId,(data : any)=>{
        console.log(data);
        this.rate.user = data;
    })
    })
    // const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
    // console.log(sessionData);
    // this.userId = sessionData.userId;
    // this.service.getuserbyId(sessionData.userId,(data : any)=>{
    //    console.log(data);
    //    this.rate.user = data;
    // })
    
  }


  public onToggle(){
      this.rate.activeStatus = true;
  }

  public onUserSelectionChange(userId : any){
      this.service.getUserById(userId,(data : any)=>{
        this.rate.user = data;
    })
  }

  public onMetalSelectionChange(metalId : any){
        console.log(metalId);
        this.service.getMetal(metalId,(data : any)=>{
          this.rate.metal = data;
        })
  }

  public onPuritySelectionChange(purityId : any){
      console.log(purityId);
      this.service.getPurity(purityId,(data : any)=>{
        this.rate.purity = data;
    })
  }

  public onSubmit(){
        this.service.addRate(this.rate,(data : any)=>{
          console.log(data);
      })
  }

  

}
