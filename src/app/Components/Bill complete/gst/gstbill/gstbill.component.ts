import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MainService } from "src/app/Components/main.service";
import { Bill, Shop } from "src/app/commons/common.objects";
import { Pipe, PipeTransform } from "@angular/core";

@Component({
  selector: "app-gstbill",
  templateUrl: "./gstbill.component.html",
  styleUrls: ["./gstbill.component.css"],
})
export class GstbillComponent {
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
          gender: ""
        },
        phone1: "",
        phone2: "",
        email: "",
        location: "",
        user: {
          userId: 0,
          userName: "",
          password: "",
          role: []
        }
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

  shop: Shop = {
    shopId: 0,
    shopName: "",
    logo: "",
    address: "",
    phone: "",
    email: "",
    state: "",
    gstNo: "",
    panNo: "",
    bankDetails: {
      bankDetailsId: 0,
      ifsccode: "",
      accountNo: "",
      accountHolderName: "",
      branch: "",
      branchAddress: "",
      qrCode: "",
      description: "",
      active: false,
    },
  };

  billId: any = 0;

  rate: any = {};

  products: any[] = [];
  amountGst: number = 0;
  time: string = "";
  date: string = "";
  goldRate: any = {};
  silverRate: any = {};
  gold: string = "Gold";
  silver: string = "Silver";
  userId: any;
  idForms: any[] = [];

  shopList: any[] = [];
  newRates: any[] = [];

  imageSrc: string = "";
  QRimageSrc: string = "";
  rates: any;
  rate1: any;
  rate2: any;
  rate3: any;
  items: any;
  totalProcessing: number = 0;
  wordNumber: any;

  constructor(private service: MainService, private route: ActivatedRoute) {
    this.service.getRateForGold(1, 1, (data: any) => {
      console.log(data);
      this.goldRate = data;
    });
    this.service.getRateForSilver(2, (data: any) => {
      this.silverRate = data;
    });

    this.route.paramMap.subscribe((params) => {
      this.billId = params.get("data");
      //this.updateCompanyProcess(this.entity_id);
      this.service.getBill(this.billId, (data: any) => {
        console.log(data);
        this.bill = data;
        this.products = this.bill.products;


        this.wordNumber = ((this.bill.actualAmount+this.totalProcessing)*0.03) +( this.bill.actualAmount+this.totalProcessing)

        console.log(this.totalProcessing)
        console.log(this.wordNumber)
        // this.amountInWords = this.transform(this.wordNumber);

        this.amountGst = this.bill.actualAmount * 0.03;
      
this.getQRImage();

        this.date = this.bill.trdate.slice(0, 10);
        this.getTrTime();
        this.service.getRateToday((data: any) => {
          this.rates = data;
          for (let i = 0; i < this.rates.length; i++) {
            if (
              this.rates[i].metal.metalName.toLowerCase() == "gold" &&
              this.rates[i].purity.purityName.toLowerCase() == "22k"
            ) {
              this.rate1 = this.rates[i].ratePerGram;
              this.newRates.push(this.rates[i].ratePerGram);
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
              console.log(this.newRates);
            }
          }
        });

    this.calculatingTotalPrice();
   
      });
      
    });
  }

  loginUserId: any = 0;
  ngOnInit(): void {
    let username = window.sessionStorage.getItem("userName");

    this.service.getUserByUserName(username, (data: any) => {
      this.loginUserId = data.userId;
      this.bill.user = data;
      this.service.getLoginByUser(this.loginUserId, (data: any) => {
        this.bill.login = data;
      });
    });
    // this.calculatingTotalPrice();
   
    this.getShope();
  }

  public getTrTime() {
    // Get the current date and time
    const currentDateTime = new Date();

    // Extract the current time components
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    this.time =
      JSON.stringify(hours) +
      ":" +
      JSON.stringify(minutes) +
      ":" +
      JSON.stringify(seconds);
  }

  file: any = "";

  @ViewChild("contentToConvert")
  contentToConvert!: ElementRef;
  imageData: any = "";

  downloadPDF(): void {
    const doc = new jsPDF();

    const options = {
      margin: { top: 10, left: 10 },
      filename: "downloaded_pdf.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2canvas(this.contentToConvert.nativeElement, { scale: 2 }).then(
      (canvas) => {
        this.imageData = canvas.toDataURL("image/jpeg", 1.0);
        doc.addImage(
          this.imageData,
          "JPEG",
          options.margin.left,
          options.margin.top,
          canvas.width * 0.15, // Adjust width to fit content (you can change the scale as needed)
          canvas.height * 0.15 // Adjust height to fit content
        );

        this.file = this.bill.billId + this.bill.customer.customerName + ".pdf";

        options.filename =
          this.bill.billId + "_" + this.bill.customer.customerName + ".pdf";

        doc.save(options.filename);
        //this.downloadPdf();
        //  this.emailDetails.msgBody = JSON.stringify("This is appointment details");
        //                       this.emailDetails.subject = "Confirmation mail";
        //                       this.emailDetails.recipient = this.visitor.visitor_email;
        //                       this.emailDetails.attachment = "D:/downloads/"+this.file;
        //                       this.emailDetails.msgBody = "This is your appointment details"
        //                       this.http.post("http://localhost:9090/mail/sendMailWithAttachment",this.emailDetails)
        //                                .subscribe(
        //                                 response => {
        //                                   console.log('Upload and email sent:', response);
        //                                 },
        //                                 error => {
        //                                   console.error('Error uploading and sending email:', error);
        //                                 })
      }
    );
  }
  // ngOnInit(){
  //   const sessionData = JSON.parse(localStorage.getItem('sessionData')as string);
  //   console.log(sessionData);
  //   this.userId = sessionData.userId;
  //   this.service.getuserbyId(sessionData.userId,(data : any)=>{
  //      console.log(data);
  //      this.bill.user = data;
  //   })
  // }

  amountInWords: string = "";

  private units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  private teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  private tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  // transform(value: number): string {
  //   if (value === 0) {
  //     return "Zero";
  //   }

  //   if (value < 10) {
  //     return this.units[value];
  //   }

  //   if (value < 20) {
  //     return this.teens[value - 10];
  //   }

  //   if (value < 100) {
  //     return this.tens[Math.floor(value / 10)] + " " + this.units[value % 10];
  //   }

  //   if (value < 1000) {
  //     return (
  //       this.units[Math.floor(value / 100)] +
  //       " Hundred " +
  //       this.transform(value % 100)
  //     );
  //   }

  //   if (value < 100000) {
  //     return (
  //       this.transform(Math.floor(value / 1000)) +
  //       " Thousand " +
  //       this.transform(value % 1000)
  //     );
  //   }

  //   if (value < 10000000) {
  //     return (
  //       this.transform(Math.floor(value / 100000)) +
  //       " Lakh " +
  //       this.transform(value % 100000)
  //     );
  //   }

  //   return "Number too large";
  // }


  public calculatingTotalPrice(){
    console.log('............................')
    for(let i =0;this.bill.products.length>i;i++){
      console.log(this.bill)
      this.totalProcessing = this.bill.products[i].processing + this.totalProcessing;
      console.log(this.totalProcessing)
    this.wordNumber = ((this.bill.actualAmount+this.totalProcessing)*0.03) +( this.bill.actualAmount+this.totalProcessing);
    console.log(this.wordNumber)
    this.amountInWords = this.transform(this.wordNumber);

    }





  }

  transform(value: number): string {
    const integerValue = Math.floor(value);
    const decimalValue = value % 1;

    let result = this.transformInteger(integerValue);
    if (decimalValue !== 0) {
      result += " point " + this.transformDecimal(decimalValue);
    }
    return result;
  }

  private transformInteger(value: number): string {
    if (value === 0) {
      return "Zero";
    }

    if (value < 10) {
      return this.units[value];
    }

    if (value < 20) {
      return this.teens[value - 10];
    }

    if (value < 100) {
      return this.tens[Math.floor(value / 10)] + " " + this.units[value % 10];
    }

    if (value < 1000) {
      return (
        this.units[Math.floor(value / 100)] +
        " Hundred " +
        this.transform(value % 100)
      );
    }

    if (value < 100000) {
      return (
        this.transform(Math.floor(value / 1000)) +
        " Thousand " +
        this.transform(value % 1000)
      );
    }

    if (value < 10000000) {
      return (
        this.transform(Math.floor(value / 100000)) +
        " Lakh " +
        this.transform(value % 100000)
      );
    }

    return "Number too large";
  }

  private transformDecimal(value: number): string {
    // Assuming you want to consider up to two decimal places
    const decimalPlaces = Math.floor(value * 100) % 100; // Extract up to two decimal places
    let result = "";

    if (decimalPlaces < 10) {
      result = this.units[decimalPlaces];
    } else if (decimalPlaces < 20) {
      result = this.teens[decimalPlaces - 10];
    } else {
      result =
        this.tens[Math.floor(decimalPlaces / 10)] +
        " " +
        this.units[decimalPlaces % 10];
    }

    return result;
  }

  public getShope() {
    this.service.getAllShop((data: any) => {
      this.shopList = data;
      this.shop = this.shopList[0];

      this.getImage();
    });
  }




  public getImage(): any {
    this.service
      .getImageFromServer(this.shop.logo)
      .subscribe((imageData: ArrayBuffer) => {
        const imageBlob = new Blob([imageData], { type: "image/jpeg" });
        this.imageSrc = URL.createObjectURL(imageBlob);
      });
  }


  public getQRImage(): any {
    console.log(this.bill.payment.bankDetails.qrCode)
    this.service
      .getImageFromServer(this.bill.payment.bankDetails.qrCode)
      .subscribe((imageData: ArrayBuffer) => {
        const imageBlob = new Blob([imageData], { type: "image/jpeg" });
        this.QRimageSrc = URL.createObjectURL(imageBlob);
      });
  }
}
