import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../commons/common.objects';

@Component({
  selector: 'app-form8',
  templateUrl: './form8.component.html',
  styleUrls: ['./form8.component.css']
})
export class Form8Component {

  panelOpenState : boolean = false;

  currentDate : any = '';

  onStartblur():void{
   // console.log(this.appointmentform.value.appointment_start)
  }
  onEndblur():void{
   // console.log(this.appointmentform.value.appointment_end)
  }
  onTypeblur():void{
   // console.log(this.appointmentform.value.appointment_type)
  }

  appointment : Appointment = {
    appointment_id: 0,
    appointment_start: '',
    appointment_end: '',
    visitor: {
      visitor_id: 0,
      visitor_name: '',
      visitor_address: '',
      visitor_email: '',
      visitor_phone1: '',
      visitor_phone2: '',
      visitor_photo: '',
      visitor_aadhar: ''
    },
    vehicle: {
      vehicleId: 0,
      vehicleNumber: '',
      vehicleType: '',
      driverLicense: '',
      driverName: '',
      driverPhoto: '',
      vehicleCopy: ''
    },
    item: {
      item_id: 0,
      item_Name: '',
      item_Description: ''
    },
    approver: {
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
    },
    facilityVisitedList: [],
    sectionVisitedList: [],
    appointment_type: '',
    checkInTime: '',
    checkOutTime: ''
  };

  constructor(private httpClient : HttpClient,private route : ActivatedRoute){

  }

  appointment_id : any = 0;

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
         this.appointment_id = params.get('data');
         //this.updateCompanyProcess(this.entity_id);
         this.httpClient.get("http://localhost:9090/Appointment/"+this.appointment_id)
                        .subscribe((data : any)=>{
                            this.appointment = data;
                        })
    }

    )
}

   public checkInUpdate(){
      this.httpClient.put("http://localhost:9090/AppointmentCheckIn/"+this.appointment_id,this.appointment)
                     .subscribe((data : any)=>{
                         console.log(data);
                     })
   }

   public checkOutUpdate(){
      this.httpClient.put("http://localhost:9090/AppointmentCheckOut/"+this.appointment_id,this.appointment)
                     .subscribe((data : any)=>{
                        console.log(data);
                     })
   }

   public sectionCheckIn(sectionVisited_id : number){
      this.httpClient.put("http://localhost:9090/AppointmentSectionCheckIn/"+this.appointment_id+"/section/"+sectionVisited_id,this.appointment)
                     .subscribe((data : any)=>{
                        console.log(data);
                     })
   }

   public sectionCheckOut(sectionVisited_id : number){
      this.httpClient.put("http://localhost:9090/AppointmentSectionCheckOut/"+this.appointment_id+"/section/"+sectionVisited_id,this.appointment)
                    .subscribe((data : any)=>{
                        console.log(data);
                    })
   }

   public facilityCheckIn(facilityVisited_id : number){
      this.httpClient.put("http://localhost:9090/AppointmentFacilityCheckIn/"+this.appointment_id+"/facility/"+facilityVisited_id,this.appointment)
                     .subscribe((data : any)=>{
                        console.log(data);
                     })
   }

   public facilityCheckOut(facilityVisited_id : number){
      this.httpClient.put("http://localhost:9090/AppointmentFacilityCheckOut/"+this.appointment_id+"/facility/"+facilityVisited_id,this.appointment)
                     .subscribe((data : any)=>{
                        console.log(data);
                     })
   }


}
