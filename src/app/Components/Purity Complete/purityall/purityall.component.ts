import { getLocaleMonthNames } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purityall',
  templateUrl: './purityall.component.html',
  styleUrls: ['./purityall.component.css']
})
export class PurityallComponent {

  displayedColumns: string[] = ['purityId', 'purityName','actions'];
  purityList : any[] = [];

  constructor(private service : MainService,private router : Router){
    this.service.getAllPurity((response : any)=>{
        this.purityList = response;
    })
  }

  editItem(element: any) {
    // Implement edit logic here
    console.log('Edit item:', element);
    this.router.navigate(['/purity', { data: element.purityId }]);
  }

}
