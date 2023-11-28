import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageModel, Shop } from 'src/app/commons/common.objects';
import { MainService } from '../main.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
 
// public myForm: FormGroup | any;
//   shop: FormGroup | any ;

shop : Shop = {
  shopId: 0,
  shopName: '',
  logo: '',
  address: '',
  email: '',
  state: '',
  phone: ''
}

imageData : any = '';

  constructor(private service : MainService,private httpClient : HttpClient){

  }


ngOnInit() {
// this.shop = new FormGroup({
// shopname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
// location: new FormControl('', [Validators.required, Validators.maxLength(50)]),
// state: new FormControl('', [Validators.required, Validators.maxLength(10)]),
// email: new FormControl('',[Validators.email]),
// logo: new FormControl('',[Validators.required])
// });
}


// public myError = (controlName: string, errorName: string) =>{
// return this.myForm.controls[controlName].hasError(errorName);
// }


// public onSubmit() : any{
//   console.log(this.onSubmit)
// }

shoppe : any = {};

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
                        this.shop.logo = this.image.name;
                        this.response = 'File upload success.';
                        this.service.getImageFromServer(this.shop.logo).subscribe(
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





    public onSubmit(){
        //  this.shoppe = this.shop.value;
        //  this.httpClient.post("",this.shoppe)
        //                 .subscribe((data : any)=>{
        //                     console.log(data);
        //                 })

        this.service.addShop(this.shop,(data : any)=>{
           console.log(data);
        })
    }
}
  




