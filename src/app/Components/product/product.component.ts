import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageModel, Product } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  metals : any[] = [];
  purities : any[] = [];
  categories : any[] = [];
  rates : any[] = [];
  users : any[] = [];

  product : Product = {
    productId: 0,
    weightage: 0,
    wastage: 0,
    comment: '',
    trDate: '',
    trTime: {
      hours: 0,
      minutes: 0
    },
    description: '',
    purity: {
      purityId: 0,
      purityName: ''
    },
    category: {
      categoryId: 0,
      categoryName: '',
      activeStatus: false,
      categoryImage: ''
    },
    metal: {
      metalId: 0,
      metalName: ''
    },
    rate: {
      rateId: 0,
      trDate: '',
      trTime: {
        hours: 0,
        minutes: 0
      },
      activeStatus: false,
      ratePerGram: 0,
      metal: {
        metalId: 0,
        metalName: ''
      },
      purity: {
        purityId: 0,
        purityName: ''
      },
      user: {
        userId: 0,
        userName: '',
        password: '',
        role: []
      }
    },
    productName: '',
    totalRate: 0,
    productImage: ''
  }

  constructor(private httpClient : HttpClient,private service : MainService){

    this.service.getAllMetals((data : any)=>{
        this.metals = data;
    })

    this.service.getAllPurity((data : any)=>{
         this.purities = data;
    })

    this.service.getAllCategory((data : any)=>{
         this.categories = data;
    })

    this.service.getAllRate((data : any)=>{
         this.rates = data;
    })

    this.service.getAllUser((data : any)=>{
         this.users = data;
    })

    


  }



  
  
  // productform = new FormGroup({
  //   weightage : new FormControl('',[Validators.required]),
  //   wastage : new FormControl('',[Validators.required]),
  //   comment : new FormControl('',[Validators.required]),
  //   trDate : new FormControl('',[Validators.required]),
  //   trTime : new FormControl('',[Validators.required]),
  //   description : new FormControl('',[Validators.required])
  // });

  // public get weightage(): FormControl{
  //   return this.productform.controls.weightage.get('weightage') as FormControl;
  // }

  // public get wastage(): FormControl{
  //   return this.productform.controls.wastage.get('wastage') as FormControl;
  // }

  // public get comment(): FormControl{
  //   return this.productform.controls.comment.get('comment') as FormControl;
  // }

  // public get description(): FormControl{
  //   return this.productform.controls.description.get('description') as FormControl;
  // }

  public onMetalSelectionChange(metalId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/metal/"+metalId)
    //                 .subscribe((data : any)=>{
    //                      this.product.metal = data;
    //                 })

    this.service.getMetal(metalId,(data : any)=>{
        console.log(data);
        this.product.metal = data;
    })
  }

  
  public onPuritySelectionChange(purityId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/purity/"+purityId)
    //                 .subscribe((data : any)=>{
    //                      this.product.purity = data;
    //                 })

    this.service.getPurity(purityId,(data : any)=>{
        console.log(data);
        this.product.purity = data;
    })
  }

  public onCategorySelectionChange(categoryId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/category/"+categoryId)
    //                 .subscribe((data : any)=>{
    //                      this.product.category = data;
    //                 })

    this.service.getCategory(categoryId,(data : any)=>{
         console.log(data);
         this.product.category = data;
    })
  }

  public onRateSelectionChange(rateId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
    //  this.httpClient.get("http://localhost:5050/rate/"+rateId)
    //                 .subscribe((data : any)=>{
    //                      this.product.metal = data;
    //                 })

    this.service.getRate(rateId,(data : any)=>{
         console.log(data);
         this.product.rate = data;
    })
  }

  public onUserSelectionChange(userId : any) {
    // console.log("Entity selected : "+entityId)
   // let eid = parseInt(entityId);
  }

  public onSubmit(){
      // this.product.weightage = this.weightage.value;
      // this.product.wastage = this.wastage.value;
      // this.product.comment = this.comment.value;
      // this.product.description = this.description.value;

      // this.httpClient.post("http://localhost:5050/product",this.product)
      //                .subscribe((data : any)=>{
      //                    console.log(data);
      //                })

      this.service.addProduct(this.product,(data : any)=>{
          console.log(data);
      })
  }
  
imageData : any = '';



  image : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }
  
  selectedFile: File | null = null;
  response : string = '';
  
    onFileSelected(event: any) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedFile = selectedFile;
        this.imageUpload();
      }
    }
  
    public imageUpload(){
  
    
      const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
      const file = fileInput?.files?.[0];
  
      if (!this.selectedFile) {
        alert('Please select a file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
      this.httpClient.post<any>('http://localhost:5050/ams/upload', formData)
               .subscribe(
                        (response) => {
                          this.image = response;
                          console.log(this.image);
                          this.product.productImage = this.image.name;
                          this.response = 'File upload success.';
                          this.service.getImageFromServer(this.product.productImage).subscribe(
                            (imageData: ArrayBuffer) => {
                              const imageBlob = new Blob([imageData], { type: 'image/jpeg' }); // Change to the appropriate type for your image
                              this.imageData = URL.createObjectURL(imageBlob);
                              console.log("image"); 
                            },
                            (error) => {
                              console.error('Error fetching image:', error);
                            }
                          );
                          // Do something with the response from the server, if needed
                        },
                        (error) => {
                          this.response = 'File upload error: ' + error.status;
                          // Handle the error, if any
                        }
                      );
    
  
    }
  
  
  
  
  
    

}
