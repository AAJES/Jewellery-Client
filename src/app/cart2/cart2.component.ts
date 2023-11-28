import { Component } from '@angular/core';
import { CartserviceService } from '../cartservice.service';
import { MainService } from '../Components/main.service';
import { Booking } from '../commons/common.objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component {

  cartItems : any[] = [];
  total = 0;
  rates : any[] = [];
  item : any = {
    id: 0,
    productName : '',
    price : 0,
    quantity : 0
  }
  rate1 : any = 0;
  rate2 : any = 0;
  rate3 : any = 0;
  newRates : any[] = [];
  booking : Booking = {
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

  idForms : any[] = [];
  employees : any[] = [];
  

  constructor(private cartService: CartserviceService,private service : MainService,private router : Router) {
    this.service.getAllCustomer((data : any)=>{
      this.customers = data;
    })
    this.service.getAllEmployee((data : any)=>{
      console.log(data);
      this.employees = data;
    })
    this.cartItems = this.cartService.getCartItems();
    //this.total = this.cartService.calculateTotal();
    console.log(this.cartItems);
    this.service.getAllIdForm((data : any)=>{
      console.log(data);
      this.idForms = data;
      const length = data.length;
      const id = data[length-1].id;
      this.service.getUserById(id,(data : any)=>{
          console.log(data);
          this.booking.user = data;
      })
    })
    this.service.getRateToday((data : any)=>{
      console.log(data);
      this.rates = data;
      for(let i = 0;i<this.rates.length;i++){
        if(this.rates[i].metal.metalName=="Gold" && this.rates[i].purity.purityName=="22K"){
            this.rate1 = this.rates[i].ratePerGram;
            console.log(this.rate1);
            this.newRates.push(this.rates[i].ratePerGram);
            // this.date = this.rates[i].trDate;
            // this.date = this.date.substring(0,10);
        }else if(this.rates[i].metal.metalName=="Gold" && this.rates[i].purity.purityName == "18K"){
            this.rate2 = this.rates[i].ratePerGram;
            console.log(this.rate2);
            this.newRates.push(this.rates[i].ratePerGram);
        }else if(this.rates[i].metal.metalName=="Silver"){
            this.rate3 = this.rates[i].ratePerGram;
            console.log(this.rate3);
            this.newRates.push(this.rates[i].ratePerGram);
            console.log(this.newRates);
            this.getItems();
        }
      }
    })

    
  }

  userId : any = 0;

  ngOnInit(){
    this.service.data$.subscribe(newData => {
      this.userId = newData;
      this.service.getUserById(this.userId,(data : any)=>{
          console.log(data);
          this.booking.user = data;
          console.log(this.booking.user);
      })
      // Do something with the updated data
    });
  }

  quantity : number[] = [];
  items : any[] = [];
  customers : any[] = [];

  public getItems(){
    console.log("ASDFGHJ");
    for(let i =0;i<this.cartItems.length;i++){
      this.item.productName = this.cartItems[i].productName;
      if(this.cartItems[i].metal.metalName=="Gold" && this.rates[i].purity.purityName=="22K"){
        console.log("asdfgh");
        //this.rate1 = this.rates[i].ratePerGram;
        // this.date = this.rates[i].trDate;
        // this.date = this.date.substring(0,10);
        
        this.item.price = this.cartItems[i].weightage * this.newRates[0];
        this.item.quantity = 1;
        this.items.push(this.item);

      }else if(this.cartItems[i].metal.metalName=="Gold" && this.rates[i].purity.purityName == "18K"){
          //this.rate2 = this.rates[i].ratePerGram;
          console.log("asdfgh");
          this.item.price = this.cartItems[i].weightage * this.newRates[1];
          this.item.quantity = 1;
          this.items.push(this.item)
      }else if(this.cartItems[i].metal.metalName=="Silver"){
          //this.rate3 = this.rates[i].ratePerGram;
          console.log("asdfgh");
          console.log(this.cartItems[i].weightage);
          console.log(this.newRates);
          this.item.price = this.cartItems[i].weightage * this.newRates[2];
          this.item.quantity = 1;
          this.items.push(this.item);
          console.log(this.items);
      }
    }
    this.calculateTotal();
  }

  public onCustomerSelectionChange(customerId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subscribe((data : any)=>{
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

    //  console.log(employeeId.value)
    //  this.id  = employeeId.value; 
     this.service.getEmployee(employeeId,(data : any)=>{
         //this.user = data;
         console.log(data);
         this.booking.employee = data;
     })
  }

  public calculateTotal(){
    
     for(let i=0;i<this.items.length;i++){
        this.total = this.total + (this.items[i].price * this.items[i].quantity);
     }
  }

  increaseItemQuantity(item : any) {
    for(let i =0;i<this.items.length;i++){
       console.log(item);
      //  if(this.items[i].productName == item.productName){
      //      this.items[i].quantity++;
      //  }
       // New object to replace the existing object
       const quantity = item.quantity + 1;
       if(quantity > 0){
        const replacementObject = { id: this.item.id, productName: this.item.productName, quantity : quantity , price : this.item.price * (quantity) };

        // Find the index of the object to be replaced (in this case, the object with id: 2)
        const indexToReplace = this.items.findIndex((item) => item.id === replacementObject.id);

        // Replace the object at the specified index with the new object
        if (indexToReplace !== -1) {
          this.items[indexToReplace] = replacementObject;
          this.calculateTotal();
        } else {
          console.log("Object not found in the array");
        }
       }  
    }
    //this.cartService.increaseQuantity(item);
    //this.total = this.cartService.calculateTotal();
  }
  
  decreaseItemQuantity(item : any) {
    // this.cartService.decreaseQuantity(item);
    // this.total = this.cartService.calculateTotal();
    for(let i =0;i<this.items.length;i++){
      console.log(item);
     //  if(this.items[i].productName == item.productName){
     //      this.items[i].quantity++;
     //  }
      // New object to replace the existing object
      const quantity = item.quantity - 1;
      if(quantity > 0){
       const replacementObject = { id: this.item.id, productName: this.item.productName, quantity : quantity , price : this.item.price * (quantity) };

       // Find the index of the object to be replaced (in this case, the object with id: 2)
       const indexToReplace = this.items.findIndex((item) => item.id === replacementObject.id);

       // Replace the object at the specified index with the new object
       if (indexToReplace !== -1) {
         this.items[indexToReplace] = replacementObject;
         this.calculateTotal();
       } else {
         console.log("Object not found in the array");
       }
      } 
   }
  }

  public addBill(){
    this.service.getUserById(this.userId,(data : any)=>{
      console.log(data);
      this.booking.user = data;
      this.booking.products = this.cartItems;
      console.log(this.booking);
      this.service.addBooking(this.booking,(data : any)=>{
        console.log(data);
        this.router.navigate(['/payment', { data: data.bookingId  }]);
    })
  })
    
  }

}
