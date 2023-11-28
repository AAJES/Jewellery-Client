import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-stockall',
  templateUrl: './stockall.component.html',
  styleUrls: ['./stockall.component.css']
})
export class StockallComponent {
  displayedColumns: string[] = ['StockId', 'MinQty', 'StockQtyInHand','TotalStock', 'Count'];
  stockList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllStock((response : any)=>{
        this.stockList = response;
    })
  }
}
