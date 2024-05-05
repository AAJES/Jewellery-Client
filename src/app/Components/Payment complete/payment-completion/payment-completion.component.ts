import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-payment-completion',
  templateUrl: './payment-completion.component.html',
  styleUrls: ['./payment-completion.component.css']
})
export class PaymentCompletionComponent {

  amount : number = 0;

  constructor(private service : MainService,private route : ActivatedRoute){

  }

  paymentId : any = 0;
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
      ifsccode: '',
      accountNo: '',
      accountHolderName: '',
      branch: '',
      branchAddress: '',
      qrCode: '',
      description: '',
      active: false
    }
  }

  amountToBePaid: number =0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.paymentId = params.get('data');
         this.service.getPayment(this.paymentId,(data : any)=>{
            console.log(data);
            this.payment = data;
         })
    })
}

  // getAmountPaid(amount : any){
  //   this.amount = this.payment.amountPaid;
  //   console.log(this.amount);
  //   console.log(amount);
  //   const paid = parseInt(amount)+this.amount;
  //   console.log(paid);
  //   this.payment.amountPaid = paid;
  // }

  

  getAmountPaid(amount: any) {
    const parsedAmount = parseInt(amount);  
    if (!isNaN(parsedAmount)) {
      const paid = parsedAmount + this.payment.amountPaid;
      console.log(paid);
      this.amountToBePaid = paid;
    } else {
      console.error('Invalid input. Please enter a valid number.');
    }
  }
  
  
  

  public onSubmit(){
    this.payment.amountPaid = this.amountToBePaid;
    this.service.updatePayment(this.paymentId,this.payment,(data : any)=>{
       console.log(data);
    })
  }
}
