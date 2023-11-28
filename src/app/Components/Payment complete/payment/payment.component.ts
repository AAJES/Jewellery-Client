import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bill, Booking, Payment, Sales } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  Payment : FormGroup | any;

  payment : Payment = {
    paymentId: 0,
    amountPaid: 0,
    totalWeight: 0,
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    products: [],
    modeOfPayment: {
      modeofPaymentId: 0,
      modeOfPayment: ''
    },
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    discountAmount: 0,
    totalAmount: 0,
    login: {
      loginId: 0,
      systemDetails: '',
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    }
  }

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

  sales : Sales = {
    salesId: 0,
    totalAmount: 0,
    discountAmount: 0,
    paymentStatus: false,
    wastage: 0,
    grossweight: 0,
    netWeight: 0,
    actualAmount: 0,
    quantity: 0,
    billgeneratedOrNo: false,
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    payment: {
      paymentId: 0,
      amountPaid: 0,
      totalWeight: 0,
      trDate: '',
      trTime: {
        hours: 0,
        minutes: 0
      },
      products: [],
      modeOfPayment: {
        modeofPaymentId: 0,
        modeOfPayment: ''
      },
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      },
      discountAmount: 0,
      totalAmount: 0,
      login: {
        loginId: 0,
        systemDetails: '',
        user: {
          userId: 0,
          userName: '',
          password: '',
          role: []
        }
      }
    },
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    },
    bill: {
      get: function (arg0: string): FormControl<any> {
        throw new Error('Function not implemented.');
      },
      billId: 0,
      productId: 0,
      paymentId: 0,
      amountPaid: 0,
      discountAmount: 0,
      actualAmount: 0,
      gst: 0,
      trdate: '',
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
      payment: {
        paymentId: 0,
        amountPaid: 0,
        totalWeight: 0,
        trDate: '',
        trTime: {
          hours: 0,
          minutes: 0
        },
        products: [],
        modeOfPayment: {
          modeofPaymentId: 0,
          modeOfPayment: ''
        },
        user: {
          userId: 0,
          userName: '',
          password: '',
          role: []
        },
        discountAmount: 0,
        totalAmount: 0,
        login: {
          loginId: 0,
          systemDetails: '',
          user: {
            userId: 0,
            userName: '',
            password: '',
            role: []
          }
        }
      },
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
      billNumber: '',
      login: {
        loginId: 0,
        systemDetails: '',
        user: {
          userId: 0,
          userName: '',
          password: '',
          role: []
        }
      }
    }
  }

  bill : Bill = {
    get: function (arg0: string): FormControl<any> {
      throw new Error('Function not implemented.');
    },
    billId: 0,
    productId: 0,
    paymentId: 0,
    amountPaid: 0,
    discountAmount: 0,
    actualAmount: 0,
    gst: 0,
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
    trdate: '',
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
    payment: {
      paymentId: 0,
      amountPaid: 0,
      totalWeight: 0,
      trDate: '',
      trTime: {
        hours: 0,
        minutes: 0
      },
      products: [],
      modeOfPayment: {
        modeofPaymentId: 0,
        modeOfPayment: ''
      },
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      },
      discountAmount: 0,
      totalAmount: 0,
      login: {
        loginId: 0,
        systemDetails: '',
        user: {
          userId: 0,
          userName: '',
          password: '',
          role: []
        }
      }
    },
    billNumber: '',
    login: {
      loginId: 0,
      systemDetails: '',
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    }
  }

  mops : any[] = [];
  userId: any;
  idForms : any[] = [];
    

    constructor(private formBuilder : FormBuilder,private service : MainService,private router : Router,private route : ActivatedRoute){
        this.Payment = this.formBuilder.group({
            amountPaid : ['', Validators.required],
            actualAmount : ['', Validators.required],
            gst : ['', Validators.required]
        })

        this.service.getAllModeOfPayment((data : any)=>{
          this.mops = data;
      })

      this.service.getAllIdForm((data : any)=>{
          this.idForms = data;
          this.service.getuserbyId(data[data.length-1].id,(data : any)=>{
            console.log(data);
            this.payment.user = data;
        })
      })
        
    }

    bookingId : any = 0;
   

    ngOnInit(){
      this.route.paramMap.subscribe(params =>{
           this.bookingId = params.get('data');
           console.log(this.bookingId);
           //this.updateCompanyProcess(this.entity_id);
           this.service.getBookingById(this.bookingId,(data : any)=>{
                this.booking = data;
                console.log(this.booking);
                this.service.getLoginByUser(this.booking.user.userId,(data : any)=>{
                  console.log(data);
                  this.payment.login = data;
                  this.service.getPaymentByBookingId(this.bookingId,this.payment,(data : any)=>{
                    console.log(data);
                    this.payment = data;
                     
               })
                // this.products = this.booking.products;  
                // this.sales.quantity = this.products.length;
                // for(let i =0;i<this.products.length;i++){
                //     this.netWeight = this.netWeight + this.products[i].product.weightage;
                // }
                // this.sales.netWeight = this.netWeight;
                
                    
    // const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
    // console.log(sessionData);
    // this.userId = sessionData.userId;
    // this.service.getuserbyId(sessionData.userId,(data : any)=>{
    //    console.log(data);
    //    this.payment.user = data;
    // })
  
                })
           })
      }
  
      )
  }

  public onModeOfPaymentSelectionChange(modeOfPaymentId : number){
    this.service.getModeOfPayment(modeOfPaymentId,(data : any)=>{
        this.payment.modeOfPayment = data;
    })
}


amountleft : any = 0;

public onSubmit(){
  this.payment.user = this.sales.user;
  this.service.updatePayment(this.payment.paymentId,this.payment,(data : any)=>{
     console.log(data);
     this.amountleft = this.payment.amountPaid - data.amountPaid;
     alert("Amount left :"+this.amountleft);
    //  this.router.navigate(['/sales', {data : this.payment.paymentId}]);
     this.bill.actualAmount = this.payment.totalAmount;
     this.bill.products = this.payment.products;
     console.log(this.bill.products);
     this.bill.discountAmount = this.payment.discountAmount;
     this.bill.payment = this.payment;
     this.bill.customer = this.booking.customer;
     this.bill.amountPaid = this.payment.amountPaid;
     this.service.addBill(this.bill,(data : any)=>{
         console.log(data);
         this.bill = data;
         this.sales.actualAmount = this.bill.actualAmount;
         this.sales.discountAmount = this.payment.discountAmount;
         this.sales.netWeight = this.payment.totalWeight;
         this.sales.totalAmount = this.payment.amountPaid;
         this.sales.payment = this.payment;
         this.sales.bill = this.bill;
         this.sales.quantity = this.payment.products.length;
         this.sales.paymentStatus = true;
         this.sales.billgeneratedOrNo = true;
         this.service.addSales(this.sales,(data : any)=>{
            console.log(data);
         })
         this.router.navigate(['/bill',{data : this.bill.billId}]);
     })
  })
}

}

