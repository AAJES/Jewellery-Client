import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/commons/common.objects';

@Component({
  selector: 'app-employesfrom',
  templateUrl: './employesfrom.component.html',
  styleUrls: ['./employesfrom.component.css'],
})
export class EmployesfromComponent {
  employees: any[] = [];
  // DepartmentList :any;
  // selectedValue:any;

  employee: Employee = {
       employeeId: 0,
       employeeName: '',
       age: 0,
       phoneNumber: '',
       Address: '',
       gender: {
            genderId: 0,
            gender: ''
       }
  };
  baseUri: string = 'http://localhost:5050/asm';
  departments: any[] = [];
  sections: any[] = [];
  designations: any[] = [];
  genders : any[] = [];
  Companiesentity: any[] = [];
  entities : any[] = [];

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
//     this.httpClient.get("http://localhost:9090/Entity")
//                      .subscribe((data : any)=>{
//                          this.entities = data;
//                          console.log(this.entities);
//                      })

//       this.httpClient.get("http://localhost:9090/visitor/Department")
//                      .subscribe((data : any)=>{
//                           this.departments = data;
//                      })               

//       this.httpClient.get("http://localhost:9090/visitor/designation/")
//                      .subscribe((data : any)=>{
//                           this.designations = data;
//                      })               

//       this.httpClient.get("http://localhost:9090/Section")
//                      .subscribe((data : any)=>{
//                           this.sections = data;
//                      })  
     //   this.httpService.getAllCompaniesentity((data : any)=>{
     //        this.entities = data;
     //   })            

     //   this.httpService.getAlldepartments((data : any)=>{
     //         this.departments = data;
     //   })

     //   this.httpService.getAllDesignation((data : any)=>{
     //         this.designations = data;
     //   })

     //   this.httpService.getAllsections((data : any)=>{
     //        this.sections = data;
     //   })

       this.httpService.getAllGender((data : any)=>{
            this.genders = data;
       })
       
  }

  public onGenderSelectionChange(genderId : any) {
     // console.log("Entity selected : "+entityId)
    // let eid = parseInt(entityId);
     //  this.httpClient.get("http://localhost:5050/gender/"+genderId)
     //                 .subscribe((data : any)=>{
     //                      this.customer.gender = data;
     //                 })
       this.httpService.getGender(genderId,(data : any)=>{
           this.employee.gender = data;
       })
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
//     this.httpClient.post("http://localhost:9090/visitor/employee",this.employee)
//                    .subscribe((data : any)=>{
//                         console.log(data);
//                    })
     //  this.httpService.addemployee(this.employee,(data : any)=>{
     //       console.log(data);
     //  })

     this.httpService.addEmployee(this.employee,(data : any)=>{
         console.log(data);
     })
  }

  public onEntitySelectionChange(entity_id: any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
     // this.httpClient.get("http://localhost:9090/Entity/"+entity_id)
     //                .subscribe((data : any)=>{
     //                     this.employee.companyEntity = data;
     //                })

     // this.httpService.getCompanyentity(entity_id,(data : any)=>{
     //      this.employee.companyEntity = data;
     // })
  }

  public onDepartmentSelectionChange(department_id: number) {
    // console.log("Entity selected : "+entityId)
    //let eid = parseInt(departmentId);
     // this.httpClient.get("http://localhost:9090/visitor/Department/"+department_id)
     //                .subscribe((data : any)=>{
     //                      this.employee.department = data;
     //                })
     // this.httpService.getdepartment(department_id,(data : any)=>{
     //      this.employee.department = data;
     // })
  }

  public onDesignationSelectionChange(designationId : number){
     // this.httpClient.get("http://localhost:9090/visitor/designation/"+designationId)
     //               .subscribe((data : any)=>{
     //                      this.employee.designation = data;
     //               })

     // this.httpService.getDesignation(designationId,(data : any)=>{
     //      this.employee.designation = data;
     // })
  }

  public onSectionSelectionChange(section_id : number){
     // this.httpClient.get("http://localhost:9090/Section/"+section_id)
     //                .subscribe((data : any)=>{
     //                       this.employee.section = data;
     //                })         
     // this.httpService.getsection(section_id,(data : any)=>{
     //      this.employee.section = data;
     // })         
  }

}
