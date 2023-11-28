import { Component } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-categoryall',
  templateUrl: './categoryall.component.html',
  styleUrls: ['./categoryall.component.css']
})
export class CategoryallComponent {
  displayedColumns: string[] = ['purityId', 'purityName'];
  categoryList : any[] = [];

  constructor(private service : MainService){
    this.service.getAllCategory((response : any)=>{
        this.categoryList = response;
    })
  }
}
