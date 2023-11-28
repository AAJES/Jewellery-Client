import { Component, Input } from '@angular/core';
import { MainService } from '../Components/main.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { User, user } from '../commons/common.objects';

@Component({
  selector: 'app-newnavbar',
  templateUrl: './newnavbar.component.html',
  styleUrls: ['./newnavbar.component.css']
})
export class NewnavbarComponent {

  sidenavOpen = false;
  openSubmenu: string | null = null;
  activeUser : boolean = true;
  user : user = {
    userId: 0,
    userName: '',
    password: '',
    role: []
  }

  @Input() sideNavStatus:boolean = false;

  // submenuStates : any = {
  //   dashboardSubMenu: false,
  //   schemeSubMenu: false,
  //   reportsSubMenu: false,
  //   configSubMenu: false
  // };

  submenuStates : any = {
    dashboardSubMenu: false,
    schemeSubMenu: false,
    reportsSubMenu: false,
    configSubMenu: false
  };



  toggleSubmenu(submenuName: string) {
    // Toggle the submenu's visibility
    this.submenuStates[submenuName] = !this.submenuStates[submenuName];
    // Close the side nav when a submenu is selected
  
  }



  // toggleSubmenu(submenuName: string) {
  //   // Toggle the submenu's visibility
  //   this.submenuStates[submenuName] = !this.submenuStates[submenuName];
  // }

  toggleSideNav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  // toggleSubmenu(submenuName: string) {
  //   if (this.openSubmenu === submenuName) {
  //     this.openSubmenu = null; // Close the submenu if it's already open
  //   } else {
  //     this.openSubmenu = submenuName; // Open the clicked submenu
  //   }
  // }
  openDialog() {
    this.dialog.open(LoginComponent, {
      data: {
        
      },
    });
  }

  rates : any[] = [];
  rate1 : string = '';
  rate2 : string = '';
  rate3 : number = 0;
  date : string = '';

  constructor(private service : MainService,private dialog : MatDialog){
      this.service.getRateToday((data : any)=>{
          console.log(data);
          this.rates = data;

          for(let i = 0;i<this.rates.length;i++){
            if(this.rates[i].metal.metalName=="Gold" && this.rates[i].purity.purityName=="22K"){
                this.rate1 = this.rates[i].ratePerGram;
                this.date = this.rates[i].trDate;
                this.date = this.date.substring(0,10);
            }else if(this.rates[i].metal.metalName=="Gold" && this.rates[i].purity.purityName == "18K"){
                this.rate2 = this.rates[i].ratePerGram;
            }else if(this.rates[i].metal.metalName=="Silver"){
                this.rate3 = this.rates[i].ratePerGram * 1000;
            }
          }
      })
  }

  userId : any = 0;

  ngOnInit(){
    this.service.data$.subscribe(newData => {
      this.userId = newData;
      this.service.getUserById(this.userId,(data : any)=>{
          console.log(data);
          this.user = data;
          if(this.user.userId!=0){
            this.activeUser = !this.activeUser;
            console.log(this.activeUser);
          }
      })
      // Do something with the updated data
    });
  }
}
