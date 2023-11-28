import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-rateall',
  templateUrl: './rateall.component.html',
  styleUrls: ['./rateall.component.css']
})
export class RateallComponent {
  displayedColumns: string[] = ['rateId', 'ratePerGram','activeStatus'];
  rateList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllRate((response : any)=>{
        this.rateList = response;
    })
  }

}
