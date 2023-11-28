import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/commons/common.objects';
import { CartserviceService } from 'src/app/cartservice.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component {


  products : any = [];
  imageSrc : any = '';
  rates : any[] = [];
  rate1 : string = '';
  rate2 : string = '';
  date : string = '';

  constructor(private service : MainService,private cartService : CartserviceService,private route : ActivatedRoute,private dialog : MatDialog){
    localStorage.clear();
    this.service.getAllProduct((data : any)=>{
        this.products = data;
        console.log(data);
        for(let i=0;i<this.products.length;i++){
            console.log(this.products[i].productImage);
            this.service.getImageFromServer(this.products[i].productImage)
                        .subscribe((imageData: ArrayBuffer) => {
                          const imageBlob = new Blob([imageData], { type: 'image/jpg' }); // Change to the appropriate type for your image
                          this.imageSrc = URL.createObjectURL(imageBlob);
                        },
                        (error) => {
                          console.error('Error fetching image:', error);
                        })
        }
    })

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
        }
      }
  })
    
  }

  openDialog() {
    this.dialog.open(LoginComponent, {
      data: {
        
      },
    });
  }

  public addCart(productId : any){
      this.service.getProduct(productId,(data : any)=>{
        console.log(data);
        this.cartService.addToCart(data);
      })
  }

  public getImage(imageUrl : string) : any{
    this.service.getImageFromServer(imageUrl)
                        .subscribe((imageData: ArrayBuffer) => {
                          const imageBlob = new Blob([imageData], { type: 'image/jpg' }); // Change to the appropriate type for your image
                          this.imageSrc = URL.createObjectURL(imageBlob);
                          return this.imageSrc;
                        },
                        (error) => {
                          console.error('Error fetching image:', error);
                        })
  }

  // ngOnInit(){
    
  // }

  ngOnInit(){
    // this.route.paramMap.subscribe(params =>{
    //   this.products = params.get('data');
    //   //this.updateCompanyProcess(this.entity_id);
    //   console.log(this.products);
    // })
    this.service.dataArray$.subscribe((dataArray) => {
      // Update the local dataArray whenever it changes
      this.products = dataArray;
      console.log(this.products);
      // Implement your logic to use the array data here
    });
}

  
  
}
