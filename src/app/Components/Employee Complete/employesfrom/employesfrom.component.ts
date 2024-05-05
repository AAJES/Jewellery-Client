import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
       address: '',
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
     employeeId: any=0;

 
  constructor(private service: MainService,private route : ActivatedRoute,private router:Router) {

       this.service.getAllGender((data : any)=>{
            this.genders = data;
       })
       
  }

  public onGenderSelectionChange(genderId : any) {
       this.service.getGender(genderId,(data : any)=>{
           this.employee.gender = data;
       })
   }

   ngOnInit(): void {
     this.route.paramMap.subscribe((params) => {
       const employeeId = params.get("data");
       console.log(employeeId);
       if (employeeId) {
         // Edit Booking
       this.employeeId = employeeId;
 
         this.service.getEmployee(employeeId, (data: any) => {
           console.log(data);
           this.employee = data;
          
         });
       } else {
         // Handle the case where bookingId is not available
       }
     });

     this.service.getAllGender((data: any) => {
      this.genders = data;
      // Assuming you want to pre-select the gender of the employee, you can set it here
      if (this.employee.gender && this.employee.gender.genderId) {
        // Find the gender in the genders array and set it as the selected option
        const selectedGender = this.genders.find(g => g.genderId === this.employee.gender.genderId);
        if (selectedGender) {
          this.employee.gender = selectedGender;
        }
      }
    });
  
   }

  

 
  public addCompanyProcess(): void {


   

     if(this.employeeId == 0){
          this.service.addEmployee(this.employee,(data : any)=>{
               console.log(data);
               this.router.navigate(['/employeeall'])
           })
        }else{
          this.service.updateEmployee(this.employeeId,this.employee,(data:any)=>{
            console.log("Update Successful")
            this.router.navigate(['/employeeall']);
          })
        }
  }

}
