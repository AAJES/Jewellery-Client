import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Bill, Booking, Cart, Payment, Sales } from "src/app/commons/common.objects";
import { MainService } from "../../main.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map, startWith } from "rxjs";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  Payment: FormGroup | any;

  payment: Payment = {
    paymentId: 0,
    amountPaid: 0,
    totalWeight: 0,
    trDate: "",
    trTime: {
      hours: 0,
      minutes: 0,
    },
    products: [],
    modeOfPayment: {
      modeofPaymentId: 0,
      modeOfPayment: "",
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    discountAmount: 0,
    totalAmount: 0,
    login: {
      loginId: 0,
      systemDetails: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
    customer: {
      customerId: 0,
      customerName: "",
      gender: {
        genderId: 0,
        gender: "",
      },
      phone1: "",
      phone2: "",
      email: "",
      location: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
  bankDetails:{
    bankDetailsId: 0,
    ifsccode: "",
    accountNo: "",
    accountHolderName: "",
    branch: "",
    branchAddress: "",
    qrCode: "",
    description: "",
    active: false
  }
  };

  // booking: Booking = {
  //   bookingId: 0,
  //   minAmount: 0,
  //   deliveryDate: "",
  //   bookingDate: "",
  //   advanceAmount: 0,
  //   customer: {
  //     customerId: 0,
  //     customerName: "",
  //     gender: {
  //       genderId: 0,
  //       gender: "",
  //     },
  //     phone1: "",
  //     phone2: "",
  //     email: "",
  //     location: "",
  //     user: {
  //       userId: 0,
  //       userName: "",
  //       password: "",
  //       role: [],
  //     },
  //   },
  //   employee: {
  //     employeeId: 0,
  //     employeeName: "",
  //     age: 0,
  //     phoneNumber: "",
  //     address: "",
  //     gender: {
  //       genderId: 0,
  //       gender: "",
  //     },
  //   },

  //   status: "",
  //   deductAmount: 0,
  //   refundAmount: 0,
  //   user: {
  //     userId: 0,
  //     userName: "",
  //     password: "",
  //     role: [],
  //   },
  //   login: {
  //     loginId: 0,
  //     systemDetails: "",
  //     user: {
  //       userId: 0,
  //       userName: "",
  //       password: "",
  //       role: []
  //     }
  //   },
  //   catalog: '',
  //   metal: {
  //     metalId: 0,
  //     metalName: ''
  //   },
  //   purity: {
  //     purityId: 0,
  //     purityName: ''
  //   },
  //   weight: 0,
  //   image: "",
  //   cancelDate: "",
  //   description: "",
  //   rate: {
  //     rateId: 0,
  //     trDate: '',
  //     trTime: {
  //       hours: 0,
  //       minutes: 0
  //     },
  //     activeStatus: false,
  //     ratePerGram: 0,
  //     metal: {
  //       metalId: 0,
  //       metalName: ''
  //     },
  //     purity: {
  //       purityId: 0,
  //       purityName: ''
  //     },
  //     user: {
  //       userId: 0,
  //       userName: '',
  //       password: '',
  //       role: []
  //     }
  //   }
  // };

  sales: Sales = {
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
    trDate: "",
    trTime: {
      hours: 0,
      minutes: 0,
    },
    payment: {
      paymentId: 0,
      amountPaid: 0,
      totalWeight: 0,
      trDate: "",
      trTime: {
        hours: 0,
        minutes: 0,
      },
      products: [],
      modeOfPayment: {
        modeofPaymentId: 0,
        modeOfPayment: "",
      },
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
      discountAmount: 0,
      totalAmount: 0,
      login: {
        loginId: 0,
        systemDetails: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      customer: {
        customerId: 0,
        customerName: "",
        gender: {
          genderId: 0,
          gender: "",
        },
        phone1: "",
        phone2: "",
        email: "",
        location: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      bankDetails: {
        bankDetailsId: 0,
        ifsccode: "",
        accountNo: "",
        accountHolderName: "",
        branch: "",
        branchAddress: "",
        qrCode: "",
        description: "",
        active: false
      }
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    bill: {
      get: function (arg0: string): FormControl<any> {
        throw new Error("Function not implemented.");
      },
      billId: 0,
      productId: 0,
      paymentId: 0,
      amountPaid: 0,
      discountAmount: 0,
      actualAmount: 0,
      gst: 0,
      trdate: "",
      trTime: {
        hours: 0,
        minutes: 0,
      },
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
      products: [],
      payment: {
        paymentId: 0,
        amountPaid: 0,
        totalWeight: 0,
        trDate: "",
        trTime: {
          hours: 0,
          minutes: 0,
        },
        products: [],
        modeOfPayment: {
          modeofPaymentId: 0,
          modeOfPayment: "",
        },
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
        discountAmount: 0,
        totalAmount: 0,
        login: {
          loginId: 0,
          systemDetails: "",
          user: {
            userId: 0,
            userName: "",
            password: "",
            role: [],
          },
        },
        customer: {
          customerId: 0,
          customerName: "",
          gender: {
            genderId: 0,
            gender: "",
          },
          phone1: "",
          phone2: "",
          email: "",
          location: "",
          user: {
            userId: 0,
            userName: "",
            password: "",
            role: [],
          },
        },
        bankDetails: {
          bankDetailsId: 0,
          ifsccode: "",
          accountNo: "",
          accountHolderName: "",
          branch: "",
          branchAddress: "",
          qrCode: "",
          description: "",
          active: false
        }
      },
      customer: {
        customerId: 0,
        customerName: "",
        gender: {
          genderId: 0,
          gender: "",
        },
        phone1: "",
        phone2: "",
        email: "",
        location: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      billNumber: "",
      login: {
        loginId: 0,
        systemDetails: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
    },
    login: {
      loginId: 0,
      systemDetails: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
  };

  bill: Bill = {
    get: function (arg0: string): FormControl<any> {
      throw new Error("Function not implemented.");
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
      customerName: "",
      gender: {
        genderId: 0,
        gender: "",
      },
      phone1: "",
      phone2: "",
      email: "",
      location: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
    trdate: "",
    trTime: {
      hours: 0,
      minutes: 0,
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    products: [],
    payment: {
      paymentId: 0,
      amountPaid: 0,
      totalWeight: 0,
      trDate: "",
      trTime: {
        hours: 0,
        minutes: 0,
      },
      products: [],
      modeOfPayment: {
        modeofPaymentId: 0,
        modeOfPayment: "",
      },
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
      discountAmount: 0,
      totalAmount: 0,
      login: {
        loginId: 0,
        systemDetails: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      customer: {
        customerId: 0,
        customerName: "",
        gender: {
          genderId: 0,
          gender: "",
        },
        phone1: "",
        phone2: "",
        email: "",
        location: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      bankDetails: {
        bankDetailsId: 0,
        ifsccode: "",
        accountNo: "",
        accountHolderName: "",
        branch: "",
        branchAddress: "",
        qrCode: "",
        description: "",
        active: false
      }
    },
    billNumber: "",
    login: {
      loginId: 0,
      systemDetails: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
  };


  cart: Cart = {
    cartId: 0,
    totalCost: 0,
    quantity: 0,
    trDate: "",
    trTime: {
      hours: 0,
      minutes: 0,
    },
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    products: [],
    booking: {
      bookingId: 0,
      minAmount: 0,
      deliveryDate: "",
      bookingDate: "",
      advanceAmount: 0,
      customer: {
        customerId: 0,
        customerName: "",
        gender: {
          genderId: 0,
          gender: "",
        },
        phone1: "",
        phone2: "",
        email: "",
        location: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      employee: {
        employeeId: 0,
        employeeName: "",
        age: 0,
        phoneNumber: "",
        address: "",
        gender: {
          genderId: 0,
          gender: "",
        },
      },
      catalog: "",
      metal: {
        metalId: 0,
        metalName: "",
      },
      purity: {
        purityId: 0,
        purityName: "",
      },
      weight: 0,
      image: "",
      status: "",
      deductAmount: 0,
      refundAmount: 0,
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
      login: {
        loginId: 0,
        systemDetails: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      cancelDate: "",
      description: "",
      rate: {
        rateId: 0,
        trDate: "",
        trTime: {
          hours: 0,
          minutes: 0,
        },
        activeStatus: false,
        ratePerGram: 0,
        metal: {
          metalId: 0,
          metalName: "",
        },
        purity: {
          purityId: 0,
          purityName: "",
        },
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: [],
        },
      },
      quantity: "",
      category: {
        categoryId: 0,
        categoryName: "",
        activeStatus: false,
        categoryImage: ""
      },
      modeOfAdvance: "",
      oldMetalWeight: 0
    },
    login: {
      loginId: 0,
      systemDetails: "",
      user: {
        userId: 0,
        userName: "",
        password: "",
        role: [],
      },
    },
  };

  mops: any[] = [];
  bankDetailsList: any[] = [];
  userId: any;
  idForms: any[] = [];
  selecteMop: any;
  selectedBankDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Payment = this.formBuilder.group({
      amountPaid: ["", Validators.required],
      actualAmount: ["", Validators.required],
      gst: ["", Validators.required],
    });

    this.service.getAllModeOfPayment((data: any) => {
      this.mops = data;
    });
    this.service.getAllBankDetails((data: any) => {
      this.bankDetailsList = data;
    });
  }

  bookingId: any = 0;
  product : any ={};

  loginUserID: any = 0;
  ngOnInit() {
    let username = window.sessionStorage.getItem("userName");
    this.service.getUserByUserName(username, (data: any) => {
      console.log(data);
      this.payment.user = data;
      this.loginUserID = data.userId;
      this.service.getLoginByUser(this.loginUserID, (data: any) => {
        console.log(data);

        this.payment.login = data;
      });
    });

    // this.route.paramMap.subscribe((params) => {
    //   this.bookingId = params.get("data");
    //   console.log(this.bookingId);
    //   //this.updateCompanyProcess(this.entity_id);
    //   this.service.getBookingById(this.bookingId, (data: any) => {
    //     this.booking = data;
    //     console.log(this.booking);

    //     // this.service.getLoginByUser(this.booking.user.userId,(data : any)=>{
    //     // console.log(data);
    //     // this.payment.login = data;
    //     this.service.getPaymentByBookingId(
    //       this.bookingId,
    //       this.payment,
    //       (data: any) => {
    //         console.log(data);
    //         this.payment = data;
    //       }
    //     );

    //     // this.products = this.booking.products;
    //     // this.sales.quantity = this.products.length;
    //     // for(let i =0;i<this.products.length;i++){
    //     //     this.netWeight = this.netWeight + this.products[i].product.weightage;
    //     // }
    //     // this.sales.netWeight = this.netWeight;

    //     // const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
    //     // console.log(sessionData);
    //     // this.userId = sessionData.userId;
    //     // this.service.getuserbyId(sessionData.userId,(data : any)=>{
    //     //    console.log(data);
    //     //    this.payment.user = data;
    //     // })

    //     // })
    //   });
    // });

    this.route.paramMap.subscribe((params) => {
      const paymentId = params.get("paymentId");
      if (paymentId) {
        // Edit Booking

       this.service.getPayment(paymentId, (data: any) => {
        this.payment = data;
       })
      } else {
        // Handle the case where bookingId is not available
      }
    });

    this.service.getAllCustomer((data: any) => {
      this.customers = data;

      this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(""),
        map((value) => this._filter(value))
      );
    });
  }

  calculateTotalWeight() {
    const totalWeight = this.payment.products.reduce(
      (total, product) => total + product.weightage,
      0
    );
    this.payment.totalWeight = parseFloat(totalWeight.toFixed(2));
  }

  calculateAmountPaid() {
    const amountPaid = this.payment.totalAmount - this.payment.discountAmount;
    this.payment.amountPaid = parseFloat(amountPaid.toFixed(2));
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter(
      (customer) =>
        customer.customerName.toLowerCase().includes(filterValue) ||
        customer.phone1.toLowerCase().includes(filterValue)
    );
  }

  displayFn(customer: any): string {
    return customer
      ? customer.customerName
      : "" || customer
      ? customer.phone1
      : "";
  }

  public onModeOfPaymentSelectionChange() {
    console.log(this.selecteMop);
    this.service.getModeOfPayment(this.selecteMop, (data: any) => {
      console.log(data);
      this.payment.modeOfPayment = data;
    });
  }


  public onBankDetrailsSelectionChange() {
    console.log(this.selectedBankDetails);
    this.service.getBankDetailsById(this.selectedBankDetails, (data: any) => {
      console.log(data);
      this.payment.bankDetails = data;
    });
  }

  selectedPaymentCustomer: boolean = false;
  filteredCustomers!: Observable<any[]>;
  customers: any[] = [];
  customerControl = new FormControl();

  public onCustomerSelectionChange(customerId: any) {
    this.service.getCustomer(customerId, (data: any) => {
      console.log(data);
      this.selectedPaymentCustomer = true;
      this.payment.customer = data;
    });
  }

  amountleft: any = 0;

  public onSubmit() {
    console.log(this.payment);
    // this.payment.user = this.sales.user;
    this.service.updatePayment(this.payment.paymentId, this.payment, (data: any) => {
      console.log(data);
      this.payment = data;
      this.amountleft = 
        this.payment.totalAmount - (data.amountPaid + data.discountAmount);
      // alert("Amount left :" + this.amountleft);
      //  this.router.navigate(['/sales', {data : this.payment.paymentId}]);
      this.bill.actualAmount = this.payment.totalAmount;

      this.bill.products = this.payment.products;
      console.log(this.bill.products);
      this.bill.discountAmount = this.payment.discountAmount;
      this.bill.payment = this.payment;
      this.bill.customer = this.payment.customer;
      this.bill.user = this.payment.user;
      this.bill.login = this.payment.login;
      this.bill.amountPaid = this.payment.amountPaid;
      console.log(this.bill);
      this.service.addBill(this.bill, (data: any) => {
        console.log(data);
        console.log('>>>>>>>OOOOOOOOOOOOOo>>>>>>.')

        for(let i=0 ;i < this.bill.products.length; i++){ 
          console.log('>>>>>>>>>>>>>>>>>>>.')

          console.log(this.bill.products[i].productId);
          console.log('>>>>>>>>>>>>>>>>>>>.')
          this.service.getProduct(this.bill.products[i].productId,(data:any)=>{
            this.product = data;
            console.log(this.product.quantity)
            this.product.quantity.quantity = 1;

            this.service.modifyByQuantity(this.product.quantity.quantityId,this.product.quantity,(data:any)=>{
              console.log(this.product.quantity)

            })
           
          })
         

         }
        this.bill = data;
        this.sales.actualAmount = this.bill.actualAmount;
        this.sales.discountAmount = this.payment.discountAmount;
        this.sales.netWeight = this.payment.totalWeight;
        this.sales.totalAmount = this.payment.amountPaid;
        this.sales.payment = this.payment;
        this.sales.login = this.bill.login;
        this.sales.bill = this.bill;
        this.sales.user = this.bill.user;
        this.sales.quantity = this.payment.products.length;
        this.sales.paymentStatus = true;
        this.sales.billgeneratedOrNo = true;
        this.service.addSales(this.sales, (data: any) => {
          console.log(data);
        
              const username = window.sessionStorage.getItem("userName");
      
              if (!username) {
                  console.error("Username not found in session storage.");
                  return;
              }
      
              this.service.getUserByUserName(username, (userData: any) => {
                  if (!userData || !userData.userId) {
                      console.error("User data not found or incomplete.");
                      return;
                  }
      
                  const userId = userData.userId;
                  this.userId = userId;
      
                  this.service.getCartByUser(userId, (cartData: any) => {
                      if (cartData !== null) {
                          this.cart = cartData;
                          this.cart.products = [];
                          this.cart.totalCost = 0;
                         
                          this.service.clearCart(this.cart.cartId, this.cart, () => {
                            //  window.location.reload();
                          });
                      }
                  });
              });
          
        });
        this.router.navigate(["/gstbill", { data: this.bill.billId }]);
      });
    });
  }
  paymentId(paymentId: any, payment: Payment, arg2: (data: any) => void) {
    throw new Error("Method not implemented.");
  }



  confirmSubmit(): void {
    if (confirm("Are you sure you want to submit this form?")) {
      // User clicked OK, proceed with form submission
      this.onSubmit();
    } else {
      // User clicked Cancel, do nothing
    }
  }
}
