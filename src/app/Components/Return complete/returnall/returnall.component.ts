import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-returnall',
  templateUrl: './returnall.component.html',
  styleUrls: ['./returnall.component.css']
})
export class ReturnallComponent {
  displayedColumns: string[] = ['returnId', 'wastage', 'grossWeight', 'netWeight'];
  returnList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllReturn((response : any)=>{
        this.returnList = response;
    })
  }
}
