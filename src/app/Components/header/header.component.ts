import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus : boolean = false;
  rates : any[] = [];
  rate1 : string = '';
  rate2 : string = '';
  rate3 : number = 0;
  date : string = '';

  constructor(private service : MainService){
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

  ngOnInit(): void{

  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }



}
