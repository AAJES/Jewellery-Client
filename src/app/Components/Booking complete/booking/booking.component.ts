import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Booking, Cart } from "src/app/commons/common.objects";
import { MainService } from "../../main.service";
import { formatDate } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map, startWith } from "rxjs";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  products: any[] = [];

  currentDate: any = "";
  user: any = {};
  users: any[] = [];
  categories: any[] = [];
  customers: any[] = [];
  employees: any[] = [];
  id: any = 0;
  amount: number = 0;
  i: number = 0;
  // minimunmAmount : number = 1000;
  // minAmount : number = 0;
  advanceAmounts: number = 0;
  ok: boolean = true;
 

  booking: Booking = {
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
  };

  idForms: any[] = [];
  metals: any;
  purities: any;
  selectedCustomerName: any;
  selectedCustomerNumber: any;
  selectedBookingCustomer: boolean = false;
  todaysRate: any[] = [];
  selectedMetal: any;
  selectedPurity: any;
  rates: any;
  rate1: any;
  newRates: any;
  rate2: any;
  rate3: any;
  // @ViewChild('bookingForm') bookingForm!: NgForm
  bookingForm!: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private service: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

    
    // this.service.getAllProduct((data : any)=>{
    //     this.products = data;
    // })

    this.service.getAllMetals((data: any) => {
      this.metals = data;
    });

    this.service.getAllPurity((data: any) => {
      this.purities = data;
    });

    this.service.getRateToday((data: any) => {
      this.todaysRate = data;
    });

    this.service.getAllCategory((data: any) => {
      this.categories = data;
      // this.service.getAllIdForm((data : any)=>{
      //   this.idForms = data;
      //   this.service.getuserbyId(data[(data.length)-1].idFormId,(data : any)=>{
      //       console.log(data);
      //       this.booking.user = data;
      //       console.log(this.booking);
      //   })
      // })
    });

    this.service.getAllEmployee((data: any) => {
      console.log(data);
      this.employees = data;
    });

    this.service.getAllCustomer((data: any) => {
      this.customers = data;
    });

    this.service.getAllUser((data: any) => {
      this.users = data;
    });
  }

  userId: any = 0;

  bookingform = new FormGroup({
    deliveryDate: new FormControl("", [Validators.required]),
    advanceAmount: new FormControl("", [Validators.required]),
  });

  formProductPurchase = new FormArray<FormControl>([]);

  public getProductName(obj: any): string {
    let id: number = obj.id;
    let ret1: string = "";
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productId == id) {
        ret1 = this.products[i].productName;
        break;
      }
    }
    return ret1;
  }

  catelogFormControl = new FormControl("", [Validators.required]);
  customerControl = new FormControl();
  filteredCustomers!: Observable<any[]>;

  loginUserID: any = 0;
  bookingId: any=0;
  ngOnInit() {
    let username = window.sessionStorage.getItem("userName");
    this.service.getUserByUserName(username, (data: any) => {
      console.log(data);
      this.loginUserID = data.userId;
      this.booking.user = data;
      this.service.getLoginByUser(this.loginUserID, (data: any) => {
        console.log(data);

        this.booking.login = data;
      });
    });

    const currentDate = new Date();
    this.booking.deliveryDate = formatDate(currentDate, "yyyy-MM-dd", "en-US");

    this.route.paramMap.subscribe((params) => {
      const bookingId = params.get("data");
      console.log(bookingId);
      if (bookingId) {
        this.bookingId = bookingId;
        this.service.getBookingById(bookingId, (data: any) => {
          console.log(data);
          this.booking = data;
          this.selectedBookingCustomer = true;

          this.booking.deliveryDate = data.deliveryDate;
          this.booking.cancelDate = new Date().toISOString();
          this.booking.status = "cancelled";
        });
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


    


    this.service.getRateToday((data: any) => {
      this.rates = data;
      for (let i = 0; i < this.rates.length; i++) {
        if (
          this.rates[i].metal.metalName.toLowerCase() == "gold" &&
          this.rates[i].purity.purityName.toLowerCase() == "22k"
        ) {
          this.rate1 = this.rates[i].ratePerGram;
          this.newRates.push(this.rates[i].ratePerGram);
          // this.date = this.rates[i].trDate;
          // this.date = this.date.substring(0,10);
        } else if (
          this.rates[i].metal.metalName.toLowerCase() == "gold" &&
          this.rates[i].purity.purityName.toLowerCase() == "18k"
        ) {
          this.rate2 = this.rates[i].ratePerGram;
          this.newRates.push(this.rates[i].ratePerGram);
        } else if (
          this.rates[i].metal.metalName.toLowerCase() == "silver"
        ) {
          this.rate3 = this.rates[i].ratePerGram;
          this.newRates.push(this.rates[i].ratePerGram);
          this.getItems();
        }
      }
    });


    this.bookingForm = this.formBuilder.group({
      advanceAmount: ['', Validators.required],
      // Other form controls go here
    });
  }
  getItems() {
    throw new Error("Method not implemented.");
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

  public get advanceAmount(): FormControl {
    return this.bookingform.controls.advanceAmount.get(
      "advanceAmount"
    ) as FormControl;
  }

  productArr: any[] = [];



  public onCategorySelectionChange(categoryId: any) {
    this.service.getCategory(categoryId, (data: any) => {
      console.log(data);
      this.booking.category = data;
     
    });
  }

  public onCustomerSelectionChange(customerId: any) {
    this.service.getCustomer(customerId, (data: any) => {
      console.log(data);
      this.selectedBookingCustomer = true;
      this.booking.customer = data;
    });
  }



  public onEmployeeSelectionChange(employeeId: any) {
    console.log(employeeId);
    this.id = employeeId;
    this.service.getEmployee(employeeId, (data: any) => {
      console.log(data);
      this.booking.employee = data;
    });
  }

  public onMetalSelectionChange(selectedMetal: any) {
    console.log(selectedMetal);

    this.service.getMetal(selectedMetal, (data: any) => {
      console.log(data);
      this.booking.metal = data;

      // if (this.booking.metal.metalName.toLowerCase() === "silver") {
      //   console.log("HHHHhaaaaaaaaarsh");
      //   this.booking.purity = {
      //     purityId: 0,
      //     purityName: "",
      //   };
      //   console.log(this.booking.purity);
      // }

      if (
        this.booking.metal.metalId !== 0 &&
        this.booking.purity.purityId !== 0
      ) {
        console.log("llllllllllllllllllll");

        this.checkRate();

      }
    });
  }

  public onPuritySelectionChange(purityId: any) {
    this.service.getPurity(purityId, (data: any) => {
      console.log(data);
      this.booking.purity = data;

      if (
        this.booking.metal.metalId !== 0 &&
        this.booking.purity.purityId !== 0
      ) {
        console.log("llllllllllllllllllll");

        this.checkRate();
      }
    });
  }

  private sendTodaysRateToBooking(metalId: any, purityId: any) {
    this.service.getRateByPurityAndMetalToday(
      metalId,
      purityId,
      (data: any) => {
        console.log(data);
      }
    );
  }



  public checkRate(){
    if(this.booking.metal.metalName.toLowerCase() == 'gold' || this.booking.purity.purityName.toLowerCase() == '22k' ){
      this.booking.rate = this.newRates[0];
      console.log(this.booking.rate)
    }else if(this.booking.metal.metalName.toLowerCase() == 'gold' || this.booking.purity.purityName.toLowerCase() == '18k' ){
      this.booking.rate = this.newRates[1]
      console.log(this.booking.rate)
    }else if(this.booking.metal.metalName.toLowerCase()=='silver'){
      this.booking.rate = this.newRates[2]
      console.log(this.booking.rate)

    }
  }

  // private sendTodaysRateToBooking() {

  //   console.log('jjjjjjjjjjjjjjjj')
  //   // Logic to find today's rate based on selected metal and purity (if applicable)
  //   if (this.booking.metal && this.booking.metal.metalName.toLowerCase() !== 'silver') {

  //     const todaysRate = this.todaysRate.find(rate =>
  //       rate.metal.metalId === this.booking.metal.metalId &&
  //       rate.purity.purityId === this.booking.purity.purityId
  //     );

  //     if (todaysRate) {
  //       this.booking.rate = todaysRate;
  //       console.log('Today\'s rate:', todaysRate);
  //     } else {
  //       console.warn('Today\'s rate not found for selected metal and purity.');
  //     }
  //   }
  // }

  public onAddProduct(productId: any) {
    console.log(productId);
    this.service.getProduct(productId, (data: any) => {
      console.log(data);
      this.productArr.push(data);
      //  this.booking.products = this.productArr;
    });
  }

  private sendTodaysRateToBooking1() {



  }

  selectedMode: string='';

  public onSubmit() {
    console.log(this.booking);
    console.log(this.selectedMode)

    if (this.bookingId == 0) {
      this.service.addBooking(this.booking, (data: any) => {
        console.log(data);
        this.router.navigate(["/allbooking"]);
      });
    } else {
      this.service.updateBooking(this.bookingId, this.booking, (data: any) => {
        console.log("Update Successful");
        this.router.navigate(["/allbooking"]);
      });
    }
  }
}
