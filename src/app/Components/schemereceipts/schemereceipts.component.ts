import { Component } from "@angular/core";
import { SchemeReceipts } from "src/app/commons/common.objects";
import { MainService } from "../main.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-schemereceipts",
  templateUrl: "./schemereceipts.component.html",
  styleUrls: ["./schemereceipts.component.css"],
})
export class SchemereceiptsComponent {
  schemeReceipts: SchemeReceipts = {
    schemeReceiptId: 0,
    scheme: {
      schemeId: 0,
      schemeName: "",
      schemeAmount: 0,
      startDate: "",
      endDate: "",
      trDate: "",
      amountPerMonth: 0,
      totalSizeCustomer: 0
    },
    schemeCustomerReceipt: {
      schemeCustomerRecId: 0,
      customerLuckyNo: 0,
      customerName: "",
      customerPhone: "",
      remark: "",
      scheme: {
        schemeId: 0,
        schemeName: "",
        schemeAmount: 0,
        startDate: "",
        endDate: "",
        trDate: "",
        amountPerMonth: 0,
        totalSizeCustomer: 0
      },
      email: ""
    },
    trDate: "",
    amount: 0,
    modeOfPayment: {
      modeofPaymentId: 0,
      modeOfPayment: "",
    },
    paymentDate: "",
  };


  selectedScheme: any;
  selectedCustomerName : any;
  selectedCustomerNumber : any;
  selectedSchemeCustomer: any;
  selectedModeOfPayment: any;
  selectedPaymentDate: string = "";
  pendingAmount:any;
  pendingMonths:number=0;

  schemes: any[] = [];

  schemeCustomers: any[] = [];
  mops: any[] = [];

  constructor(private service: MainService, private router: Router) {
    this.service.getAllSchemes((data: any) => {
      this.schemes = data;
    });

    this.service.getAllSchemeCustomers((data: any) => {
      this.schemeCustomers = data;
    });

    this.service.getAllModeOfPayment((data: any) => {
      this.mops = data;
    });

    const currentDate = new Date();
    this.schemeReceipts.paymentDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
   
  }

  public onSchemeSelectionChange(selectedSchemeId: any) {
    console.log(selectedSchemeId);
    this.service.getScheme(selectedSchemeId, (data: any) => {
      this.schemeReceipts.scheme = data;
      this.service.getSchemeCustomerReceiptByschemeId(selectedSchemeId,(data:any)=>{
        this.schemeCustomers=data;
      })
    });
  }

  public onModeOfPaymentSelectionChange(selectedModeOfPaymentId: any) {
    console.log(selectedModeOfPaymentId);
    this.service.getModeOfPayment(selectedModeOfPaymentId, (data: any) => {
      console.log(data)
      this.schemeReceipts.modeOfPayment = data;
    });
  }

  getCustomerName(customerRecId: number): string {
    const customer = this.schemeCustomers.find(sc => sc.schemeCustomerRecId === customerRecId);
    return customer ? customer.customerName : '';
  }
  
  getCustomerPhone(customerRecId: number): string {
    const customer = this.schemeCustomers.find(sc => sc.schemeCustomerRecId === customerRecId);
    return customer ? customer.customerPhone : '';
  }
  

  public onSchemeCustomerSelectionChange(selectedSchemeCustomerRecId: any) {
    console.log('on scheme customer selection change')
    this.service.getSchemeCustomer(selectedSchemeCustomerRecId, (data: any) => {
      console.log(data);
      this.schemeReceipts.schemeCustomerReceipt = data;
      this.service.getPendingAmount(selectedSchemeCustomerRecId,(data:any)=>{
        console.log(data)
        this.pendingAmount=data.dueamount;
        this.pendingMonths = data.skipedDate.length;
      })
    
      // Check if data.schemeCustomerReceipt is defined before accessing its properties
      if (data.schemeCustomerReceipt) {
        this.selectedCustomerName = data.schemeCustomerReceipt.customerName;
        this.selectedCustomerNumber = data.schemeCustomerReceipt.customerPhone;
      } else {
        console.error("schemeCustomerReceipt property is undefined.");
      }
    
      // Check if data.scheme is defined before accessing its properties
      if (data.scheme) {
        this.schemeReceipts.amount = data.scheme.amountPerMonth;
        console.log(this.schemeReceipts.amount);
      } else {
        console.error("scheme property is undefined.");
      }
    });
    
  }

  public onSubmit() {
    //this.schemeReceipts.paymentDate = this.selectedPaymentDate.toString();
    this.service.addSchemeReceipt(this.schemeReceipts, (data: any) => {
              // this.router.navigate(["/home3"]);
      window.location.reload();
    });
  }
}
