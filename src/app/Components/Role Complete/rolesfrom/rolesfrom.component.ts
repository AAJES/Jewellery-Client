import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { Role } from 'src/app/commons/common.objects';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rolesfrom',
  templateUrl: './rolesfrom.component.html',
  styleUrls: ['./rolesfrom.component.css'],
})
export class RolesfromComponent {
  roles: any[] = [];
  menus: any[] = [];
  baseUri: string = 'http://localhost:5050/asm';
  role : Role = {
    role_id: 0,
    role_description: '',
    menuGroup: {
      menu_id: 0,
      menuName: '',
      menuGroup: ''
    }
  }

  constructor(private httpService: MainService,private httpClient : HttpClient) {
    //  this.httpClient.get("http://localhost:9090/menu")
    //                 .subscribe((data : any)=>{
    //                     this.menus = data;
    //                 })

    this.httpService.getAllmenus((data : any)=>{
        this.menus = data;
    })
  }

  public onMenuSelectionChange(menu_id : number){
      //  this.httpClient.get("http://localhost:9090/menu/"+menu_id)
      //                 .subscribe((data : any)=>{
      //                     this.role.menuGroup = data;
      //                 })

      this.httpService.getmenu(menu_id,(data : any)=>{
          this.role.menuGroup = data;
      })
  }

  public addCompanyProcess(frm: any): void {
      this.httpService.addrole(this.role,(data : any)=>{
           console.log(data);
      })
  }
}
