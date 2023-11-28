import { Component } from '@angular/core';
import { MainService } from '../Components/main.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../commons/common.objects';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form5',
  templateUrl: './form5.component.html',
  styleUrls: ['./form5.component.css']
})
export class Form5Component {

  users: any[] = [];
  roles: any[] = [];
  sections: any[] = [];
  user: any = {};
  //httpClient: any;
  baseUri: string = 'http://localhost:5050/asm';
  us : User = {
    user_id: 0,
    user_Username: '',
    user_email: '',
    user_phone1: '',
    user_phone2: '',
    user_password: '',
    role: {
      role_id: 0,
      role_description: '',
      menuGroup: {
        menu_id: 0,
        menuName: '',
        menuGroup: ''
      }
    },
    section: {
      section_id: 0,
      section_description: '',
      department: {
        department_id: 0,
        department_description: '',
        entity: {
          entity_id: 0,
          entity_description: ''
        }
      }
    }
  }

  constructor(private httpService: MainService,private httpClient : HttpClient,private route : ActivatedRoute) {
    this.httpClient.get("http://localhost:9090/Role")
                   .subscribe((data : any)=>{
                      this.roles = data;
                   })

    this.httpClient.get("http://localhost:9090/Section")
                   .subscribe((data : any)=>{
                       this.sections = data;
                   })               
               
  }

  user_id : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.user_id = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.httpClient.get("http://localhost:9090/User/"+this.user_id)
                        .subscribe((data : any)=>{
                            this.us = data;
                            console.log(this.us);
                        })
    }

    )
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

  public updateCompanyProcess(){
    this.httpClient.put("http://localhost:9090/User/"+this.user_id,this.user)
                   .subscribe((data : any)=>{
                       console.log(data);
                   })
  }

}
