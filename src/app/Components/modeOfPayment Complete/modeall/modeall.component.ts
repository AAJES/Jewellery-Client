import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-modeall',
  templateUrl: './modeall.component.html',
  styleUrls: ['./modeall.component.css']
})
export class ModeallComponent {
  displayedColumns: string[] = ['purityId', 'purityName'];
  modeOfPaymentList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllModeOfPayment((response : any)=>{
        this.modeOfPaymentList = response;
    })
  }

}
