import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Return } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent {

  metals : any[] = [];
  purities : any[] = [];
  categories : any[] = [];
  users : any[] = [];
  idForms : any[] = [];

  constructor(private httpClient : HttpClient,private service : MainService){
        this.service.getAllMetals((data : any)=>{
            this.metals = data;
        })

        this.service.getAllPurity((data : any)=>{
             this.purities = data;
        })

        this.service.getAllCategory((data : any)=>{
              this.categories = data;
        })

        this.service.getAllIdForm((data : any)=>{
          this.idForms = data;
          this.service.getuserbyId(data[data.length-1].id,(data : any)=>{
            console.log(data);
            this.return.user = data;
        })
      })
  }

  userId : any = 0;

  // ngOnInit(){
  //   const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
  //   console.log(sessionData);
  //   this.userId = sessionData.userId;
  //   this.service.getuserbyId(sessionData.userId,(data : any)=>{
  //      console.log(data);
  //      this.return.user = data;
  //   })
  // }

  return : Return = {
    returnId: 0,
    wastage: 0,
    grossWeight: 0,
    netWeight: 0,
    description: '',
    returnAmount: 0,
    category: {
      categoryId: 0,
      categoryName: '',
      activeStatus: false,
      categoryImage: ''
    },
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


  returnform = new FormGroup({
    wastage : new FormControl('',[Validators.required]),
    grossWeight : new FormControl('',[Validators.required]),
    netWeight : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required]),
    returnAmount : new FormControl('',[Validators.required])
  });

  public get wastage(): FormControl{
    return this.returnform.controls.wastage.get('wastage') as FormControl;
  }

  public get grossWeight(): FormControl{
    return this.returnform.controls.grossWeight.get('grossWeight') as FormControl;
  }

  public get netWeight(): FormControl{
    return this.returnform.controls.netWeight.get('netWeight') as FormControl;
  }

  public get description(): FormControl{
    return this.returnform.controls.description.get('description') as FormControl;
  }

  public get returnAmount(): FormControl{
    return this.returnform.controls.returnAmount.get('returnAmount') as FormControl;
  }

  public netWeight1(){
      this.return.netWeight = this.return.grossWeight - this.return.wastage;
  }

  public onAddMetal(metalId : any) {
    console.log("Entity selected : "+metalId)
   let eid = parseInt(metalId);
    //  this.httpClient.get("http://localhost:5050/metal/"+metalId)
    //                 .subscribe((data : any)=>{
    //                      this.return.metal = data;
    //                 })

    this.service.getMetal(eid,(data : any)=>{
        console.log(data);
        this.return.metal = data;
    })
  }

  
  public onAddPurity(purityId : any) {
    console.log("Entity selected : "+purityId)
   let eid = parseInt(purityId);
    //  this.httpClient.get("http://localhost:5050/purity/"+purityId)
    //                 .subscribe((data : any)=>{
    //                      this.return.purity = data;
    //                 })

    this.service.getPurity(eid,(data : any)=>{
        console.log(data);
        this.return.purity = data;
    })
  }

  public onAddCategory(categoryId : any) {
    console.log("Entity selected : "+categoryId)
   let eid = parseInt(categoryId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subscribe((data : any)=>{
    //                      this.return.category = data;
    //                 })

    this.service.getCategory(eid,(data : any)=>{
        console.log(data);
        this.return.category = data;
    })
  }

  public onAddUser(userId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
     this.httpClient.get("http://localhost:5050/user/"+userId)
                    .subscribe((data : any)=>{
                         this.return.user = data;
                    })
  }

  public reset(){
    this.return.grossWeight = 0;
    this.return.netWeight = 0;
    this.return.wastage = 0;
    this.return.returnAmount = 0;
    this.return.description = '';
    this.return.category = {
      categoryId: 0,
      categoryName: '',
      activeStatus: false,
      categoryImage: ''
    };
    this.return.metal = {
      metalId: 0,
      metalName: ''
    };
    this.return.purity = {
      purityId: 0,
      purityName: ''
    };
  }

  public onSubmit(){
      // this.return.wastage = this.wastage.value;
      // this.return.netWeight = this.netWeight.value;
      // this.return.grossWeight = this.grossWeight.value;
      // this.return.description = this.description.value; 
      // this.return.returnAmount = this.returnAmount.value;

      // this.httpClient.post("http://localhost:5050/return",this.return)
      //                .subscribe((data : any)=>{
      //                   console.log(data);
      //                })

      this.service.addReturn(this.return,(data : any)=>{
          console.log(data);
      })
  }



}
