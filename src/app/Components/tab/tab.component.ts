import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment, Facility, Item, Section, Template, User, Visitor, Vehicle, FacilityVisited, SectionVisited, ImageModel, EmailDetails } from 'src/app/commons/common.objects';


import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MainService } from '../main.service';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  
})
export class TabComponent {

  


  constructor(private httpService: MainService,private http : HttpClient,private router : Router){
    httpService.getAllSection((data:any)=>{
      this.Sections = data;
    })
    httpService.getAllFacility((data: any)=>{
      this.Facilities = data;
    })
    httpService.getAllUser((data: any)=>{
      this.Users = data;
    })


  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  currentDate : any = new Date();

  selectedMatDate!: Date;

  ordinaryDateSelected!: Date;

  visitor : Visitor = {
    visitor_id: 0,
    visitor_name: '',
    visitor_address: '',
    visitor_email: '',
    visitor_phone1: '',
    visitor_phone2: '',
    visitor_photo: '',
    visitor_aadhar: ''
  };
  
  item : Item = {
    item_id: 0,
    item_Name: '',
    item_Description: ''
    
  };
  vehicle: Vehicle ={
    vehicleId: 0,
    vehicleNumber: '',
    vehicleType: '',
    driverLicense: '',
    driverName: '',
    driverPhoto: '',
    vehicleCopy: ''
  };


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
    appointment_type: '',
    checkInTime: '',
    checkOutTime: '',
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
    facilityVisitedList:[],
    sectionVisitedList:[]
  }


  facility : Facility = {
    facility_id: 0,
    facility_description: '',
    facilityCheckIn: '',
    facilityCheckOut: ''
  }

  section : Section = {
    section_id: 0,
    section_description: '',
    department: {
      department_id : 0,
      department_description : '',
      entity : {
        entity_id : 0,
        entity_description : ''
      }
    }
  }

  user : User = {
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
        department_id : 0,
        department_description : '',
        entity : {
          entity_id : 0,
          entity_description : ''
        }
      }
    }
  }
  facilityVisitedList: FacilityVisited= {
    facilityVisited_id : 0,
    facility : {
      facility_id : 0,
      facility_description : '',
      facilityCheckIn : '',
      facilityCheckOut :''

    },
    facilityCheckIn : '',
    facilityCheckOut : '',

  }

  sectionVisitedList: SectionVisited= {
    sectionVisited_id : 0,
    section : {
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
    },
    sectionCheckIn : '',
    sectionCheckOut :''

  }

  onStartblur():void{
    console.log(this.appointmentform.value.appointment_start)
  }
  onEndblur():void{
    console.log(this.appointmentform.value.appointment_end)
  }
  onTypeblur():void{
    console.log(this.appointmentform.value.appointment_type)
  }

  appointmentform = new FormGroup({
    appointment_start : new FormControl('',[Validators.required]),
    appointment_end : new FormControl('',[Validators.required]),
    appointment_type : new FormControl('',[Validators.required]),
    
    visitorform:new FormGroup({
      visitor_name : new FormControl('',[Validators.required,Validators.pattern("[A-Z a-z]*")]),
      visitor_email : new FormControl('',[Validators.required,Validators.email,Validators.pattern("[A-Za-z0-9_.]@[A-Za-z][.]com")]),
      visitor_phone1 : new FormControl('',[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(15)]),
      visitor_phone2 : new FormControl('',[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(15)]),
      visitor_address : new FormControl('',[Validators.required]),
      visitor_photo : new FormControl('',[Validators.required]),
      //visitor_aadhar : new FormControl('',[Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(15)])
    }),
    itemform : new FormGroup({
      item_Name : new FormControl('',[Validators.required]),
      item_Description : new FormControl('',[Validators.required])
    }),
  
    vehicleform :new FormGroup({
      vehicleNumber : new FormControl('',[Validators.required]),
      vehicleType : new FormControl('',[Validators.required]),
      driverLicense : new FormControl('',[Validators.required]),
      driverName : new FormControl('',[Validators.required])
    })
    
     
  });
  public get visitor_name(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_name') as FormControl;
  }

  public get visitor_address(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_address') as FormControl;
  }

  public get visitor_email(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_email') as FormControl;
  }

  public get visitor_phone1(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_phone1') as FormControl;
  }

  public get visitor_phone2(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_phone2') as FormControl;
  }

  public get visitor_photo(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_photo') as FormControl;
  }

  // public get visitor_aadhar(): FormControl{
  //   return this.appointmentform.controls.visitorform.get('visitor_aadhar') as FormControl;
  // }

  public get vehicleNumber(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_name') as FormControl;
  }

  public get vehicleType(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_name') as FormControl;
  }

  public get driverName(): FormControl{
    return this.appointmentform.controls.visitorform.get('visitor_name') as FormControl;
  }

  

  public getAllSection(){
    this.httpService.getAllSection((data : any) =>{
      this.Sections = data;
    })
  }

  public getSectionName(obj : any) : string{
    let id : number = obj.id;
    let ret1 : string = "";
    for(let i=0;i<this.Sections.length;i++){
      if(this.Sections[i].section_id == id){
        ret1 =  this.Sections[i].section_description;
        break;
      }
    }
    return ret1;
  }

 

  public getAllFacility(){
    this.httpService.getAllFacility((data : any) =>{
      this.Facilities = data;
    })
  }

  public getFacilityName(obj : any) : string{
    let id : number = obj.id;
    let ret2 : string = "";
    for(let i=0;i<this.Facilities.length;i++){
      if(this.Facilities[i].facility_id == id){
        ret2 =  this.Facilities[i].facility_description;
        break;
      }
    }
    return ret2;
  }


  public getAllUser(){
    this.httpService.getAllUser((data : any) =>{
      this.Users = data;
    })
  }

  public getUserName(obj : any) : string{
    let id : number = obj.id;
    let ret3 : string = "";
    for(let i=0;i<this.Users.length;i++){
      if(this.Users[i].user_id == id){
        ret3 =  this.Users[i].user_Username;
        break;
      }
    }
    return ret3;
  }

  id : string = '';

  
  public onCheckValues(user:any,facility:any,section:any){
    console.log("User : "+user);
    console.log("Facility : "+facility);
    console.log("Section  : "+section);
    this.Appointment.section.section_id={"sectionVisited_id":section.value};
    this.Appointment.user.user_id={"user_id":user.value}
    this.Appointment.facility.facility_id={"facility_id":facility.value}
    this.httpService.addAppointment(this.Appointment,(data:any)=>{
console.log(data)
    })
    console.log(this.Appointment)

  }
 
  Appointment : any={} ;

  Sections : Section[] = [];
 
  formSections = new FormArray<FormControl>([]);
  sectionArr : SectionVisited[]=[];
  

  formFacilities =  new FormArray<FormControl>([]);
  facilitiesArr : FacilityVisited[]=[];
 
 
  formUsers = new FormArray<FormControl>([]);
 
  public onAddSection(section : HTMLSelectElement){
    console.log(section.value)
    this.formSections.push(new FormControl({"id":section.value}))
    for(let val of section.value){
      console.log(val)
     this.httpService.getSectionById(parseInt(val),(data: any)=>{
      let sv : SectionVisited ={
        section: data,
        sectionVisited_id: 0,
        sectionCheckIn: '',
        sectionCheckOut: ''
      };
      this.httpService.addSectionVisited(sv,(data:any)=>{
        let sv1: SectionVisited={
          sectionVisited_id: data.sectionVisited_id,
          section : {
            section_id: data.section_id,
            section_description: '',
            department: {
              department_id: data.department_id,
              department_description: '',
              entity: {
                entity_id: data.entity_id,
                entity_description: ''
              }
            }
          },
          sectionCheckIn: '',
          sectionCheckOut: ''
        }
        this.sectionArr.push(sv1);
        console.log(this.sectionArr);
      })
     })
    }    
 };
  
 public onAddUser(user : HTMLSelectElement){
  console.log(user.value)
  this.id  = user.value; 
 this.httpService.getUserById(parseInt(this.id),(data:any)=>{
  this.user=data;
  console.log(data.user_id)
 })
}
  
  Facilities : Facility[] = [];
  
  public onAddFacility(facility : HTMLSelectElement){
    console.log(facility.value)
    this.formFacilities.push(new FormControl({"id":facility.value}))
    for(let val of facility.value){
      console.log(val)
     this.httpService.getFacilityById(parseInt(val),(data: any)=>{
      let fv : FacilityVisited ={
        facilityVisited_id: 0,
        facility: data,
        facilityCheckIn: '',
        facilityCheckOut: ''
      };
      this.httpService.addFacilityVisited(fv,(data:any)=>{
       let fv1 : FacilityVisited={
         facilityVisited_id: data.facilityVisited_id,
         facility : {
          facility_id : data.facility_id,
          facility_description : '',
          facilityCheckIn : '',
          facilityCheckOut :''
    
        },
         facilityCheckIn: '',
         facilityCheckOut: ''
       };
       
        this.facilitiesArr.push(fv1);
        console.log(this.facilitiesArr);
      })
     })
    }
  }

  


  
  Users : User[] = [];
  
 

  
  formItems : FormArray<FormControl> = new FormArray<FormControl>([]);
  items : Item[] = [];
  items1: Item[]=[];

  Entity: any[] = [];
   

  public onAddItems(item : HTMLSelectElement){
    this.formItems.push(new FormControl({"id":item.value}))
  }

  vehicle1 : Vehicle = {
    vehicleId: 0,
    vehicleNumber: '',
    vehicleType: '',
    driverLicense: '',
    driverName: '',
    driverPhoto: '',
    vehicleCopy: ''
  }
  
 

  public onSubmit(){let u2 = this.user;
    let u1:User={
      user_id: u2.user_id,
      user_Username: '',
      user_email: '',
      user_phone1: '',
      user_phone2: '',
      user_password: '',
      role: {
        role_id: u2.role.role_id,
        role_description: '',
        menuGroup: {
          menu_id: 0,
          menuName: '',
          menuGroup: ''
        }
      },
      section:{
        section_id: u2.section.section_id,
        section_description: '',
        department:{
          department_id: u2.section.department.department_id,
          department_description: '',
          entity: {
            entity_id: u2.section.department.entity.entity_id,
            entity_description: ''
          }
        }
      }
    };

    let visitorobj : Visitor = {
      visitor_name: this.visitor_name.value,
      visitor_address: this.visitor_address.value,
      visitor_email: this.visitor_email.value,
      visitor_phone1: this.visitor_phone1.value,
      visitor_phone2: this.visitor_phone2.value,
      visitor_photo: this.image.type,
      visitor_aadhar: this.image1.type,
      visitor_id: 0
    }
    console.log(visitorobj);
    this.httpService.addVisitor(visitorobj,(response:any)=>{
          console.log(response);
         this.visitor.visitor_id= response.visitor_id;
          this.httpService.addItem(this.appointmentform.controls.itemform.value,(data : any)=>{
              console.log(data);
              this.item.item_id=data.item_id;
                  let vehicleobj : Vehicle = {
                    vehicleId: 0,
                    vehicleNumber: this.vehicleNumber.value,
                    vehicleType: this.vehicleType.value,
                    driverLicense: this.image2.type,
                    driverName: this.driverName.value,
                    driverPhoto: this.image4.type,
                    vehicleCopy: this.image3.type
                  }
                  console.log(vehicleobj);
                  this.httpService.addVehicle(vehicleobj,(data : any)=>{
                    console.log(data);
                    this.vehicle.vehicleId=data.vehicleId;  
                          let appobj :Appointment ={
                            appointment_id: 0,
                            appointment_start: this.Appointment.appointment_start,
                            appointment_end: this.Appointment.appointment_end,
                            appointment_type: this.Appointment.appointment_type,
                            visitor: this.visitor,
                            vehicle: this.vehicle,
                            item: this.item,
                            checkInTime: '',
                            checkOutTime: '',
                            approver:u1 ,
                            facilityVisitedList: this.facilitiesArr,
                            sectionVisitedList: this.sectionArr
                          };
                          console.log(JSON.stringify(appobj)); 
                          this.httpService.addAppointment(appobj,(data:any)=>{
                            console.log(data);
                            this.appointment1 = data; 
                            this.parentdata = this.appointment1.visitor.visitor_id;
                            this.navigateToReceiver(this.appointment1.appointment_id);          
                            // this.emailDetails.msgBody = JSON.stringify(this.appointment1.appointment_id);
                            // this.emailDetails.subject = " This is appointment details";
                            // this.emailDetails.recipient = this.appointment1.visitor.visitor_email;
                            // this.http.post("http://localhost:9090/mail/sendMail",this.emailDetails)
                            //          .subscribe((data : any)=>{
                            //             console.log("Sent mail")
                            //          })
                                           
                          })
              });         
              });
              });
        
        

     
     this.Appointment= this.appointmentform.value;
     console.log(this.visitor);
     console.log(this.vehicle);
     console.log(this.item);

      let appobj :Appointment ={
        appointment_id: 0,
        appointment_start: this.Appointment.appointment_start,
        appointment_end: this.Appointment.appointment_end,
        appointment_type: this.Appointment.appointment_type,
        visitor: this.visitor,
        vehicle: this.vehicle,
        item: this.item,
        checkInTime: '',
        checkOutTime: '',
        approver:u1 ,
        facilityVisitedList: this.facilitiesArr,
        sectionVisitedList: this.sectionArr
      };
      console.log(JSON.stringify(appobj));

      // this.httpService.addAppointment(appobj,(data:any)=>{
      //   console.log(data);
      // })   

  }

  parentdata : number = this.visitor.visitor_id;

  navigateToReceiver(appointment_id : number) {
    this.router.navigate(['/template', { data: this.appointment1.appointment_id }]);
  }

  emailDetails : EmailDetails = {
    mailNo: 0,
    sender: '',
    recipient: '',
    msgBody: '',
    subject: '',
    attachment: ''
  }

  appointment1 : Appointment = {
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
  }
  
  
  
  // public get formSections():FormArray{
  //   return this.appointmentform.controls.formSections;
  // }public get formFacilities():FormArray{
  //   return this.appointmentform.controls.formFacilities;
  // }public get formUsers():FormArray{
  //   return this.appointmentform.controls.formUsers;
  // }
  
  response: string = '';
  selectedfile : string = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedfile = event.target.files[0];
    // You can do something with the selected file if needed
  }
  
  image : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }

  image1 : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }

  image2 : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }

  image3 : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }

  image4 : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }
  

  public imageUploadVisitor(){

  
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    const file = fileInput?.files?.[0];

    if (!this.selectedfile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedfile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.http.post<any>('http://localhost:9090/ams/upload', formData)
             .subscribe(
                      (response1) => {
                        this.image = response1;
                        console.log(this.image);
                        this.response = 'File upload success.';
                        // Do something with the response from the server, if needed
                      },
                      (error) => {
                        this.response = 'File upload error: ' + error.status;
                        // Handle the error, if any
                      }
                    );
  

  }

  public idUploadVisitor(){

    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    const file = fileInput?.files?.[0];

    if (!this.selectedfile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedfile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.http.post<any>('http://localhost:9090/ams/upload', formData)
             .subscribe(
                      (response1) => {
                        this.image1 = response1;
                        console.log(this.image);
                        this.response = 'File upload success.';
                        // Do something with the response from the server, if needed
                      },
                      (error) => {
                        this.response = 'File upload error: ' + error.status;
                        // Handle the error, if any
                      }
                    );

  }

  public idUploadDriver(){

    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    const file = fileInput?.files?.[0];

    if (!this.selectedfile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedfile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.http.post<any>('http://localhost:9090/ams/upload', formData)
             .subscribe(
                      (response1) => {
                        this.image2 = response1;
                        console.log(this.image);
                        this.response = 'File upload success.';
                        // Do something with the response from the server, if needed
                      },
                      (error) => {
                        this.response = 'File upload error: ' + error.status;
                        // Handle the error, if any
                      }
                    );

  }

  public copyUploadVehicle(){

    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    const file = fileInput?.files?.[0];

    if (!this.selectedfile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedfile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.http.post<any>('http://localhost:9090/ams/upload', formData)
             .subscribe(
                      (response1) => {
                        this.image3 = response1;
                        console.log(this.image);
                        this.response = 'File upload success.';
                        // Do something with the response from the server, if needed
                      },
                      (error) => {
                        this.response = 'File upload error: ' + error.status;
                        // Handle the error, if any
                      }
                    );

  }

  public imageUploadDriver(){

    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    const file = fileInput?.files?.[0];

    if (!this.selectedfile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedfile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.http.post<any>('http://localhost:9090/ams/upload', formData)
             .subscribe(
                      (response1) => {
                        this.image4 = response1;
                        console.log(this.image);
                        this.response = 'File upload success.';
                        // Do something with the response from the server, if needed
                      },
                      (error) => {
                        this.response = 'File upload error: ' + error.status;
                        // Handle the error, if any
                      }
                    );

  }

 

}
