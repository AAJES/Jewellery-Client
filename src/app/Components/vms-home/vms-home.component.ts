import { Component, Input } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { IdForm, user } from 'src/app/commons/common.objects';




@Component({
  selector: 'app-vms-home',
  templateUrl: './vms-home.component.html',
  styleUrls: ['./vms-home.component.css']
})
export class VmsHomeComponent {

  constructor(private service : MainService,private route : ActivatedRoute){

  }

  userId : any = 0;
  user : user = {
    userId: 0,
    userName: '',
    password: '',
    role: []
  }

  valid : boolean = false;
  idForm : IdForm = {
    idFormId: 0,
    id: 0
  }

  sideNavStatus: boolean = false;

  menuItems = [
    {
      label: 'Dashboard',
      submenu: [
        { label: 'Dashboard', link: '/dashboard2' }
      ],
      isOpen: false
    },
    {
      label: 'Scheme',
      submenu: [
        { label: 'Add Schemes', link: '/scheme' },
        { label: 'Scheme Registration', link: '/schemecustomerReceipt' },
        { label: 'Add Scheme Receipts', link: '/schemeReceipts' },
        { label: 'Scheme Receipts All', link: '/schemerecall' }
      ],
      isOpen: false
    },
    {
      label: 'Reports',
      submenu: [
        { label: 'Sales Report', link: '/salesReport' },
        { label: 'Less Paid Report', link: '/lessPaidReport' },
        { label: 'Bill Reports', link: '/billReport' }
      ],
      isOpen: false
    },
    {
      label: 'Configuration',
      submenu: [
        { label: 'Metal', link: '/allmetal' },
        { label: 'Purity', link: '/allpurity' },
        { label: 'Booking', link: '/booking' }
      ],
      isOpen: false
    }
    // Add more menu items as needed
  ];

  // Create an object to keep track of submenu states
  submenuStates : any = {
    dashboardSubMenu: false,
    schemeSubMenu: false,
    reportsSubMenu: false,
    configSubMenu: false
  };



  toggleSubmenu(submenuName: string) {
    // Toggle the submenu's visibility
    this.submenuStates[submenuName] = !this.submenuStates[submenuName];
  }

  // toggleSubmenu(item : any) {
  //   item.isOpen = !item.isOpen;
  // }
  
  // toggleSubmenu(submenuId: string) {
  //   const submenu = document.getElementById(submenuId);

  //   if (submenu) {
  //     submenu.classList.toggle('show');
  //   }
  // }

  toggleSideNav() {
    this.sideNavStatus = !this.sideNavStatus;
  }

  public isLoggedIn(): boolean {
    return this.service.isAuthenticated();
  }

  ngOnInit(){
    console.log('aaaaaaaaaaaaaaaaaasssssssssssssssssssssssssss');
    
    this.route.paramMap.subscribe(params =>{
         this.userId = params.get('data');
         if(this.userId != null){
          console.log(this.userId);
          this.valid = true;
          console.log(this.valid);
       }
         //this.parentmessage = this.userId;
         console.log(this.userId);
         this.idForm.id = this.userId;
         this.service.addIdForm(this.idForm,(data : any)=>{
            console.log(data);
         })
        //  this.service.get("http://localhost:5050/asm/assetDetails/assetCode/"+this.assetCode)
        //              .subscribe((data : any)=>{
        //                 console.log(data);
        //                 this.scrap.assetDetails = data;
        //              })
         //this.updateCompanyProcess(this.entity_id);
         localStorage.setItem('sessionData', JSON.stringify({ userId: JSON.stringify(this.userId) }));
         console.log(JSON.parse(localStorage.getItem('sessionData')as string))
         this.service.getuserbyId(this.userId,(data : any)=>{
             console.log(data);
             this.user = data;
            // this.roles = this.user.roles;
             //console.log(this.user.roles.description)
            //  for(let i = 0;i<this.roles.length;i++){
            //   console.log(this.roles);
            //  if(this.roles[i].description == "Admin"){
            //     console.log(this.roles[i].description);
            //     this.admin = true;
            //  }
            //  if(this.roles[i].description == "Employee"){
            //     this.employee = true;
            //  }
            // } 
         })
    }
  
    )
  }

  showMore = false;
  toggleShowMore() {
    this.showMore = !this.showMore;
  }


  showMore1 = false;
  toggleShowMore1() {
    this.showMore1 = !this.showMore1;
  }
  

  showMore2 = false;
  toggleShowMore2() {
    this.showMore2 = !this.showMore2;
  }


  showMore3 = false;
  toggleShowMore3() {
    this.showMore3 = !this.showMore3;
  }


  

  
}
