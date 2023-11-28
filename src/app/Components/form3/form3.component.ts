import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/commons/common.objects';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css']
})
export class Form3Component {

  employees: any[] = [];
  // DepartmentList :any;
  // selectedValue:any;

  employee : Employee = {
    employeeId: 0,
    employeeName: '',
    age: 0,
    phoneNumber: '',
    Address: '',
    gender: {
      genderId: 0,
      gender: ''
    }
  }
  baseUri: string = 'http://localhost:9090/visitor';
  departments: any[] = [];
  sections: any[] = [];
  designations: any[] = [];
  entities : any[] = [];
  Companiesentity: any[] = [];
  empl : any = {};
  employeeId : any = 0;



  // ngOnInit(): void {
  //   this.httpService.getDepList().subscribe((data:any)=>{
  //     this.DepartmentList=data;
  //   })
  // }

  // ChangeDepartment(e:any){
  //   console.log(e.target.value)
  //   this.employee=e.target.value;
  // }

  constructor(private httpService: MainService,private httpClient : HttpClient,private route : ActivatedRoute) {
      // this.httpClient.get("http://localhost:9090/Entity")
      //                .subscribe((data : any)=>{
      //                    this.entities = data;
      //                })

      // this.httpClient.get("http://localhost:9090/visitor/Department")
      //                .subscribe((data : any)=>{
      //                     this.departments = data;
      //                })               

      // this.httpClient.get("http://localhost:9090/visitor/designation/")
      //                .subscribe((data : any)=>{
      //                     this.designations = data;
      //                })               

      // this.httpClient.get("http://localhost:9090/Section")
      //                .subscribe((data : any)=>{
      //                     this.sections = data;
      //                })               
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.employeeId = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.httpClient.get("http://localhost:9090/visitor/employee/"+this.employeeId)
                        .subscribe((data : any)=>{
                            this.empl = data;
                        })
    }

    )
}

  // public addCompanyProcess( frm : any): void {
  //   let data = frm.value;
  //   data.companyEntity.entityId = parseInt(data.companyEntity.entityId);
  //   // console.log(data);
  //   this.httpService.adddepartment(data, (data: any[]) => {

  //     this.departments = data;
  //   });
  // }

  public addCompanyProcess(frm: any): void {
    let data = frm.value;
    data.companyEntity.entityId = parseInt(data.companyEntity.entityId);
    data.department.departmentId = parseInt(data.department.departmentId);
    data.section.sectionId = parseInt(data.section.sectionId);
    data.designation.designationId = parseInt(data.designation.designationId);
    console.log(data);
    this.httpService.addemployee(data, (data: any[]) => {
      this.employees = data;
    });
  }

  public onEntitySelectionChange(entityId: string) {
    // console.log("Entity selected : "+entityId)
    //let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:9090/Entity/"+entityId)
    //                 .subscribe((data : any)=>{
    //                      this.employee.companyEntity = data;
    //                 })
  }

  public onDepartmentSelectionChange(departmentId: string) {
    // console.log("Entity selected : "+entityId)
    //let eid = parseInt(departmentId);
    //  this.httpClient.get("http://localhost:9090/visitor/Department/"+departmentId)
    //                 .subscribe((data : any)=>{
    //                       this.employee.department = data;
    //                 })
  }

  public onDesignationSelectionChange(designationId : number){
    //  this.httpClient.get("http://localhost:9090/visitor/designation/"+designationId)
    //                .subscribe((data : any)=>{
    //                       this.employee.designation = data;
    //                })
  }

  public onSectionSelectionChange(section_id : number){
    //  this.httpClient.get("http://localhost:9090/Section/"+section_id)
    //                 .subscribe((data : any)=>{
    //                        this.employee.section = data;
    //                 })                  
  }

  public updateCompanyProcess(){
    //  this.httpClient.put("http://localhost:9090/visitor/employee"+this.empl.employeeId,this.employee)
    //                 .subscribe((data : any)=>{
    //                       console.log(data);
    //                 })
  }

}
