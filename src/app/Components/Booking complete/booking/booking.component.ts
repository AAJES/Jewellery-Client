import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking, Cart } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  products : any[] = [];

  

  currentDate : any = '';
  user : any = {};
  users : any[] = [];
  categories : any[] = [];
  customers : any[] = [];
  employees : any[] = [];
  id : any = 0;
  amount : number = 0;
  i : number = 0;
  // minimunmAmount : number = 1000;
  // minAmount : number = 0;
  advanceAmounts : number = 0;
  ok : boolean = true;
  cart : Cart = {
    cartId: 0,
    totalCost: 0,
    quantity: 0,
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    products: [],
    booking: {
      bookingId: 0,
      minAmount: 0,
      deliveryDate: '',
      bookingDate: '',
      advanceAmount: 0,
      customer: {
        customerId: 0,
        customerName: '',
        gender: {
          genderId: 0,
          gender: ''
        },
        phone1: '',
        phone2: '',
        email: '',
        location: '',
        user: {
          userId: 0,
          userName: '',
          password: '',
          role: []
        }
      },
      employee: {
        employeeId: 0,
        employeeName: '',
        age: 0,
        phoneNumber: '',
        Address: '',
        gender: {
          genderId: 0,
          gender: ''
        }
      },
      products: [],
      status: '',
      deductAmount: 0,
      refundAmount: 0,
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    }
  }

  idForms : any[] = [];

  constructor(private httpClient : HttpClient,private service : MainService){
      // this.service.getAllProduct((data : any)=>{
      //     this.products = data;
      // })

      this.service.getAllCategory((data : any)=>{
          console.log("Inside")
          this.categories = data;
          // this.service.getAllIdForm((data : any)=>{
          //   this.idForms = data;
          //   this.service.getuserbyId(data[(data.length)-1].idFormId,(data : any)=>{
          //       console.log(data);
          //       this.booking.user = data;
          //       console.log(this.booking);
          //   })
          // })
      })

      this.service.getAllEmployee((data : any)=>{
           console.log(data);
           this.employees = data;
      })

      this.service.getAllCustomer((data : any)=>{
           this.customers = data;
           
      })

      this.service.getAllUser((data : any)=>{
            this.users = data;
      })

      
  }

  userId : any = 0;

  

  bookingform = new FormGroup({
    deliveryDate : new FormControl('',[Validators.required]),
    advanceAmount : new FormControl('',[Validators.required]),
  });

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

  booking : Booking = {
    bookingId: 0,
    minAmount: 1000,
    deliveryDate: '',
    advanceAmount: 0,
    products: [],
    customer: {
      customerId: 0,
      customerName: '',
      gender: {
        genderId: 0,
        gender: ''
      },
      phone1: '',
      phone2: '',
      email: '',
      location: '',
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    },
    employee: {
      employeeId: 0,
      employeeName: '',
      age: 0,
      phoneNumber: '',
      Address: '',
      gender: {
        genderId: 0,
        gender: ''
      }
    },
    bookingDate: '',
    status: '',
    deductAmount: 0,
    refundAmount: 0,
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    }
  }

  // ngOnInit(){
  //   const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
  //   console.log(sessionData);
  //   this.userId = sessionData.userId;
  //   this.service.getuserbyId(sessionData.userId,(data : any)=>{
  //      console.log(data);
  //      this.booking.user = data;
  //   })
  // }

  public get advanceAmount(): FormControl{
    return this.bookingform.controls.advanceAmount.get('advanceAmount') as FormControl;
  }

  productArr : any[] = [];

  public checkAdvanceAmount(advanceAmount : number){
     if(this.booking.minAmount>advanceAmount){
        this.ok = false;
     }
  }

  public onUserSelectionChange(userId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subscribe((data : any)=>{
    //                      this.product.category = data;
    //                 })

    this.service.getUserById(userId,(data : any)=>{
        this.user = data;
    })
  }

  public onCategorySelectionChange(categoryId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subscribe((data : any)=>{
    //                      this.product.category = data;
    //                 })

    this.service.getCategory(categoryId,(data : any)=>{
         console.log(data);
         this.service.getCategoryProduct(data.categoryId,(datas : any)=>{
             this.products = datas;
         })
    })
  }

  public onCustomerSelectionChange(customerId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subsassssssssssssssssssssssssssscribe((data : any)=>{
    //                      this.product.category = data;
    //                 })

    this.service.getCustomer(customerId,(data : any)=>{
          console.log(data);
          this.booking.customer = data;
    })
  }

  public onEmployeeSelectionChange(employeeId : any) {
    // console.log("Entity selected : "+entityId)
    //  let eid = parseInt(userId);
    //  this.service.getUserById(eid,(data : any)=>{
    //     this.user = data;
    //  })

     console.log(employeeId.value)
     this.id  = employeeId.value; 
     this.service.getEmployee(employeeId,(data : any)=>{
         this.user = data;
         this.booking.employee = data;
     })
  }

  public onAddProduct(productId : any){
    console.log(productId)
    this.service.getProduct(productId,(data : any)=>{
       console.log(data);
       this.productArr.push(data);
       this.booking.products = this.productArr;
    })
    // this.formProductPurchase.push(new FormControl({"id":product.value}))
    // for(let val of product.value){
    //   console.log(val)
    //   this.service.getProduct(val,(data : any)=>{
    //     let pp : any ={
    //       productPurchaseId: 0,
    //       trDate: '',
    //       trTime: '',
    //       totalWeight: data.totalWeight,
    //       amountPaid: data.totalWeight,
    //       count: 0,
    //       product: data,
    //       user: {
    //         userId: this.user.userId,
    //         username: '',
    //         email: '',
    //         phone1: '',
    //         phone2: '',
    //         password: ''
    //       }
    //     };
    //     this.service.addProductPurchase(pp,(response : any)=>{
    //       let pp1: any={
    //         productPurchaseId: response.productPurchaseId,
    //         trDate: response.trDate,
    //         trTime: response.trTime,
    //         totalWeight: response.totalWeight,
    //         amountPaid: response.amountPaid,
    //         count: response.count,
    //         product: response.product,
    //         user: response.user
    //       }
    //       this.productArr.push(pp1);
    //       console.log(this.productArr);
    //       this.booking.products = this.productArr;
    //     })
    //   })

      // for(this.i = 0;this.i<this.productArr.length;this.i++){
      //      this.minimunmAmount = this.productArr[this.i].productpurchase.product.
      // }

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
    //                                                   this.booking.products = this.productArr;
    //                                                 })
    //                                               })
     //                                        }    
   }

   public onSubmit(){
    
    //  this.booking.deliveryDate = this.currentDate;
    //  this.booking.advanceAmount = this.advanceAmount.value;

    //  this.httpClient.post("http://localhost:5050/booking",this.booking)
    //                 .subscribe((data : any)=>{
    //                     console.log(data);
    //                 })
       this.service.addBooking(this.booking,(data : any)=>{
           console.log(data);
           this.cart.booking = data;
           this.cart.trDate = data.bookingDate;
           this.cart.user = data.user;
           this.cart.products = data.products;
           this.service.addCart(this.cart,(data : any)=>{
                console.log(data);
           })
       })
   }


}
