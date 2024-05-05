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

  selectedMetal: any; 
  selectedPurity: any; 
selectedStatus: any;


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

    let username = window.sessionStorage.getItem("userName");
   
    this.service.getUserByUserName(username, (data: any) => {
      console.log(data);
      this.rate.user = data;
    })

    
  }


  public onToggle(){
      this.rate.activeStatus = true;
  }



  public onMetalSelectionChange(metalId : any){
        this.service.getMetal(metalId,(data : any)=>{
          this.rate.metal = data;
        })
  }

  public onPuritySelectionChange(purityId : any){
      this.service.getPurity(purityId,(data : any)=>{
        this.rate.purity = data;
    })
  }

  public onSubmit(){

        this.service.addRate(this.rate,(data : any)=>{
          window.location.reload()
      })
  }

  

}
