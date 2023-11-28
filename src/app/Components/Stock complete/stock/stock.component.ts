import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../../main.service';
import { user } from 'src/app/commons/common.objects';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {

  metals : any[] = [];
  categories : any[] = [];
  purities : any[] = [];
  products : any[] = [];
  id : number = 0;
  stock : any = {
    stockId: 0,
    minQty: 0,
    stockQtyInHand: 0,
    totalStock: 0,
    count: 0,
    productPurchase: {},
    metal: {
      metalId: 0,
      metalName: ''
    },
    category: {
      categoryId: 0,
      categoryName: '',
      activeStatus: false,
      categoryImage: ''
    },
    purity: {
      purityId: 0,
      purityName: ''
    }
  }

  user : user = {
    userId: 0,
    userName: '',
    password: '',
    role: []
  }

  metal : any = {};
  category : any = {};
  purity : any = {};
  userId: any;
  idForms : any[] = [];


  constructor(private httpClient : HttpClient,private service : MainService){
        // this.httpClient.get("http://localhost:5050/metal")
        //                .subscribe((data : any)=>{
        //                   this.metals = data;
        //                })

        // this.httpClient.get("http://localhost:5050/category")
        //                .subscribe((data : any)=>{
        //                   this.categories = data;
        //                })
                       
        // this.httpClient.get("http://localhost:5050/purity")
        //                .subscribe((data : any)=>{
        //                   this.purities = data;
        //                })   
        
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
            this.user = data;
        })
      })
  }
  // ngOnInit(){
  //   const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
  //   console.log(sessionData);
  //   this.userId = sessionData.userId;
  //   this.service.getuserbyId(sessionData.userId,(data : any)=>{
  //      console.log(data);
  //      this.user = data;
  //   })
  // }

  stockform = new FormGroup({
    minQty : new FormControl('',[Validators.required]),
    stockQtyInHand : new FormControl('',[Validators.required]),
    totalStock : new FormControl('',[Validators.required]),
    count : new FormControl('',[Validators.required])
  });

  public get minQty(): FormControl{
    return this.stockform.controls.minQty.get('minQty') as FormControl;
  }

  public get stockQtyInHand(): FormControl{
    return this.stockform.controls.stockQtyInHand.get('stockQtyInHand') as FormControl;
  }

  public get totalStock(): FormControl{
    return this.stockform.controls.totalStock.get('totalStock') as FormControl;
  }

  public get count(): FormControl{
    return this.stockform.controls.count.get('count') as FormControl;
  }


  formProductPurchase = new FormArray<FormControl>([]);
  
  public getProductName(obj : any) : string{
    let id : number = obj.id;
    let ret1 : string = "";
    for(let i=0;i<this.products.length;i++){
      if(this.products[i].productId == id){
        ret1 =  this.products[i].productName;
        break;
      }
    }
    return ret1;
  }

  productArr : any[] = [];



  public onAddProduct(product : HTMLSelectElement){
    console.log(product.value)
    this.formProductPurchase.push(new FormControl({"id":product.value}))
    for(let val of product.value){
      console.log(val)
      let pp : any ={
                                    productPurchaseId: 0,
                                    trDate: '',
                                    trTime: '',
                                    totalWeight: 0,
                                    amountPaid: 0,
                                    count: 0,
                                    product: val,
                                    user: {
                                      userId: this.user.userId,
                                      username: '',
                                      email: '',
                                      phone1: '',
                                      phone2: '',
                                      password: ''
                                    }
                                  };
      this.service.addProductPurchase(pp,(data : any)=>{
           this.stock.productPurchase = data;
      })
    //  this.httpClient.get("http://localhost:5050/product/"+val)
    //                 .subscribe((data: any)=>{
    //                           let pp : any ={
    //                             productPurchaseId: 0,
    //                             trDate: '',
    //                             trTime: '',
    //                             totalWeight: 0,
    //                             amountPaid: 0,
    //                             count: 0,
    //                             product: data,
    //                             user: {
    //                               userId: 0,
    //                               username: '',
    //                               email: '',
    //                               phone1: '',
    //                               phone2: '',
    //                               password: ''
    //                             }
    //                           };
    //                           this.httpClient.post("http://localhost:5050/productpurchase",pp)
    //                                          .subscribe((data:any)=>{
    //                                                   let pp1: any={
    //                                                     productPurchaseId: data.productPurchaseId,
    //                                                     trDate: data.trDate,
    //                                                     trTime: data.trTime,
    //                                                     totalWeight: data.totalWeight,
    //                                                     amountPaid: data.amountPaid,
    //                                                     count: data.count,
    //                                                     product: data.product,
    //                                                     user: data.user
    //                                                   }
    //                                                   this.productArr.push(pp1);
    //                                                   console.log(this.productArr);
    //                                                   this.stock.productPurchaseList = this.productArr;
    //                                                 })
    //                                               })
                                                  }    
   }

   public onAddMetal(metal : HTMLSelectElement){
      console.log(metal.value)
      this.id  = parseInt(metal.value); 
      // this.httpClient.get("http://localhost:5050/metal/"+this.id)
      //                .subscribe((data : any)=>{
      //                    this.metal = data;
      //                })
      this.service.getMetal(this.id,(data : any)=>{
         this.stock.metal = data;
      })
  }

  public onAddCategory(category : HTMLSelectElement){
      console.log(category.value)
      this.id  = parseInt(category.value); 
      // this.httpClient.get("http://localhost:5050/category/"+this.id)
      //               .subscribe((data : any)=>{
      //                   this.category = data;
      //               })
      this.service.getCategoryProduct(this.id,(data : any)=>{
         this.products = data;
      })
  }

  public onAddPurity(purity : HTMLSelectElement){
    console.log(purity.value)
    this.id  = parseInt(purity.value); 
    // this.httpClient.get("http://localhost:5050/purity/"+this.id)
    //               .subscribe((data : any)=>{
    //                   this.purity = data;
    //               })
    this.service.getPurity(this.id,(data : any)=>{
       this.stock.purity = data;
    })
}

   public onSubmit(){
       this.stock.user = this.user;
       this.service.addStock(this.stock,(data : any)=>{
          console.log(data);
       })
   }
   

}
