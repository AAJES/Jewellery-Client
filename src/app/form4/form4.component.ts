import { Component } from '@angular/core';
import { MainService } from '../Components/main.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.css']
})
export class Form4Component {

  sections: any[] = [];
  departments: any[] = [];
  section: any = {};
  //httpClient: any;
  sect : any = {};

  constructor(private httpService: MainService,private httpClient : HttpClient,private route : ActivatedRoute) {
    this.httpClient.get("http://localhost:9090/visitor/Department")
                   .subscribe((data : any)=>{
                      this.departments = data;
                   })
  }

  section_id : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.section_id = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.httpClient.get("http://localhost:9090/Section/"+this.section_id)
                        .subscribe((data : any)=>{
                            this.sect = data;
                        })
    }

    )
}

  public onDepartmentSelectionChange(department_id: number) {
    // console.log("Entity selected : "+entityId)
    //let eid = parseInt(departmentId);
    this.httpClient.get("http://localhost:9090/visitor/Department/"+department_id)
                    .subscribe((data : any)=>{
                          this.section.department = data;
                    })
  }


  public updateCompanyProcess(){
    this.httpClient.put("http://localhost:9090/Section/"+this.sect.section_id,this.section)
                   .subscribe((data : any)=>{
                       console.log(data);
                   })
  }
}
