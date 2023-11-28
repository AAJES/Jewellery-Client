import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuGroup } from '../commons/common.objects';

@Component({
  selector: 'app-form6',
  templateUrl: './form6.component.html',
  styleUrls: ['./form6.component.css']
})
export class Form6Component {

  menus: any[] = [];
  menu: any = {};
  menuGroup : MenuGroup = {
    menu_id: 0,
    menuName: '',
    menuGroup: ''
  }

  constructor(private httpClient : HttpClient,private route : ActivatedRoute){

  }

  menu_id : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.menu_id = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.httpClient.get("http://localhost:9090/visitor/menu"+this.menu_id)
                        .subscribe((data : any)=>{
                            this.menuGroup = data;
                            console.log(this.menuGroup);
                        })
    }

    )
}

    public updateCompanyProcess(){
       this.httpClient.put("http://localhost:9090/visitor/menu/"+this.menuGroup.menu_id,this.menu)
                      .subscribe((data : any)=>{
                          console.log(data);
                      })
    }
}
