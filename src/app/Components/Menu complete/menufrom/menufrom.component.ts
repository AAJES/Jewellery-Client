import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menufrom',
  templateUrl: './menufrom.component.html',
  styleUrls: ['./menufrom.component.css']
})
export class MenufromComponent {

  menus: any[] = [];
  menu: any = {};
  baseUri: string = 'http://localhost:5050/asm';
  
  constructor(private httpService: MainService,private http : HttpClient) {
    httpService.getAllmenus((data: any[]) => {
      this.menus = data;
    });
  }

  public addCompanyProcess(): void {
    //  this.http.post("http://localhost:9090/visitor/menu",this.menu)
    //           .subscribe((data : any)=>{
    //               console.log(data);
    //           }) 

    this.httpService.addmenu(this.menu,(data : any)=>{
        console.log(data);
    })
    
  }
}
