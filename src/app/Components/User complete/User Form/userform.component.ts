import { Component } from '@angular/core';
import { MainService } from '../../main.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent {
  users: any[] = [];
  roles: any[] = [];
  sections: any[] = [];
  user: any = {};
  //httpClient: any;
  baseUri: string = 'http://localhost:5050/asm';
  

  constructor(private httpService: MainService,private httpClient : HttpClient) {
    this.httpClient.get("http://localhost:9090/Role")
                   .subscribe((data : any)=>{
                      this.roles = data;
                   })

    this.httpClient.get("http://localhost:9090/Section")
                   .subscribe((data : any)=>{
                       this.sections = data;
                   })               
               
  }

  public addCompanyProcess(): void {
     this.httpClient.post("http://localhost:9090/User",this.user)
                    .subscribe((data : any)=>{
                         console.log(data);
                    })
  }

  public onRoleSelectionChange(role_id:number) {
    // console.log("Entity selected : "+entityId)
    //let eid = parseInt(departmentId);
     this.httpClient.get("http://localhost:9090/Role/"+role_id)
                    .subscribe((data : any)=>{
                          this.user.role = data;
                    })
  }

  public onSectionSelectionChange(section_id:number) {
    // console.log("Entity selected : "+entityId)
    //let eid = parseInt(departmentId);
     this.httpClient.get("http://localhost:9090/Section/"+section_id)
                    .subscribe((data : any)=>{
                          this.user.section = data;
                    })
  }
}
