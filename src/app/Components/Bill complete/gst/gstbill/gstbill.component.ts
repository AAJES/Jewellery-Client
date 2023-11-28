import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MainService } from 'src/app/Components/main.service';
import { Bill } from 'src/app/commons/common.objects';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-gstbill',
  templateUrl: './gstbill.component.html',
  styleUrls: ['./gstbill.component.css']
})
export class GstbillComponent{

  
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

  billId : any = 0;

  rate : any = {};

  products : any[] = [];
  amountGst : number = 0;
  time : string = '';
  date : string = '';
  goldRate : any = {};
  silverRate : any = {};
  gold : string = "Gold";
  silver : string = "Silver";
  userId: any;
  idForms : any[] = [];

  constructor(private service : MainService,private route : ActivatedRoute){
    this.service.getRateForGold(1,1,(data : any)=>{
       console.log(data);
       this.goldRate = data;
    })
    this.service.getRateForSilver(2,(data : any)=>{
       this.silverRate = data;
    })
    
    this.service.getAllIdForm((data : any)=>{
       this.idForms = data;
       this.service.getuserbyId(data[data-length-1],(data : any)=>{
           console.log(data);
           this.bill.user = data;
       })
    })
    this.route.paramMap.subscribe(params =>{
      this.billId = params.get('data');
      //this.updateCompanyProcess(this.entity_id);
      this.service.getBill(this.billId,(data : any)=>{
          console.log(data);
          this.bill = data;
          this.products = this.bill.products;
          this.amountInWords = this.transform(this.bill.amountPaid);
          this.amountGst = this.bill.actualAmount * 0.03;
          this.date = this.bill.trdate.slice(0,10);
          this.getTrTime();
      })
 }

 )
  }

  public getTrTime(){
     // Get the current date and time
      const currentDateTime = new Date();

      // Extract the current time components
      const hours = currentDateTime.getHours();
      const minutes = currentDateTime.getMinutes();
      const seconds = currentDateTime.getSeconds();

      console.log(`Current Time: ${hours}:${minutes}:${seconds}`);
      this.time = JSON.stringify(hours)+":"+JSON.stringify(minutes)+":"+JSON.stringify(seconds);
  }

  file : any = '';

  @ViewChild('contentToConvert')
  contentToConvert!: ElementRef;
  imageData : any = '';

  downloadPDF(): void {
    console.log("pdf");
    const doc = new jsPDF();

    const options = {
      margin: { top: 10, left: 10 },
      filename: 'downloaded_pdf.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    console.log("pdf2");
    html2canvas(this.contentToConvert.nativeElement, { scale: 2 }).then((canvas) => {
      this.imageData = canvas.toDataURL('image/jpeg', 1.0);
      doc.addImage(
        this.imageData,
        'JPEG',
        options.margin.left,
        options.margin.top,
        canvas.width * 0.15, // Adjust width to fit content (you can change the scale as needed)
        canvas.height * 0.15 // Adjust height to fit content
      );
      console.log("pdf3");

      this.file = this.bill.billId+ this.bill.customer.customerName + '.pdf';

      options.filename =  this.bill.billId +"_"+ this.bill.customer.customerName + '.pdf';

      console.log("pdf4");
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
    });
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

  amountInWords : string = '';

  private units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  private teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  private tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  transform(value: number): string {
    if (value === 0) {
      return 'Zero';
    }

    if (value < 10) {
      return this.units[value];
    }

    if (value < 20) {
      return this.teens[value - 10];
    }

    if (value < 100) {
      return this.tens[Math.floor(value / 10)] + ' ' + this.units[value % 10];
    }

    if (value < 1000) {
      return this.units[Math.floor(value / 100)] + ' Hundred ' + this.transform(value % 100);
    }

    if (value < 100000) {
      return this.transform(Math.floor(value / 1000)) + ' Thousand ' + this.transform(value % 1000);
    }

    if (value < 10000000) {
      return this.transform(Math.floor(value / 100000)) + ' Lakh ' + this.transform(value % 100000);
    }

    return 'Number too large';
  }
}



