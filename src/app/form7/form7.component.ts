import { Component } from '@angular/core';
import { Role } from '../commons/common.objects';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form7',
  templateUrl: './form7.component.html',
  styleUrls: ['./form7.component.css']
})
export class Form7Component {

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
  role1 : any = {};

  constructor(private httpClient : HttpClient,private route : ActivatedRoute){
     this.httpClient.get("http://localhost:9090/menu")
                    .subscribe((data : any)=>{
                        this.menus = data;
                    })
  }

  role_id : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.role_id = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.httpClient.get("http://localhost:9090/Role"+this.role_id)
                        .subscribe((data : any)=>{
                            this.role1 = data;
                        })
    }

    )
}

  public onMenuSelectionChange(menu_id : number){
    this.httpClient.get("http://localhost:9090/menu/"+menu_id)
                   .subscribe((data : any)=>{
                       this.role.menuGroup = data;
                   })
}



  public updateCompanyProcess(){
     this.httpClient.put("http://localhost:9090/Role/"+this.role1.role_id,this.role)
                    .subscribe((data : any)=>{
                        console.log(data);
                    })
  }

}
