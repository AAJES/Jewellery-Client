import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, ImageModel } from 'src/app/commons/common.objects';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  category : Category = {
    categoryId: 0,
    categoryName: '',
    activeStatus: false,
    categoryImage: ''
  }

  status : boolean = false;

  constructor(private httpClient : HttpClient,private service : MainService){

  }


  categoryform = new FormGroup({
    categoryName : new FormControl('',[Validators.required]),
    activeStatus : new FormControl('',[Validators.required]),
    categoryImage : new FormControl('',[Validators.required])
  });

  public get categoryName(): FormControl{
    return this.categoryform.controls.categoryName.get('categoryName') as FormControl;
  }

  public get activeStatus(): FormControl{
    return this.categoryform.controls.activeStatus.get('activeStatus') as FormControl;
  }

  public get categoryImage(): FormControl{
    return this.categoryform.controls.categoryImage.get('categoryImage') as FormControl;
  }

  image : ImageModel = {
    id: 0,
    name: '',
    type: ''
  }

  response: string = '';
  selectedfile : string = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedfile = event.target.files[0];
    // You can do something with the selected file if needed
  }

  public imageUpload(){

  
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    const file = fileInput?.files?.[0];

    if (!this.selectedfile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedfile);

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.httpClient.post<any>('http://localhost:5050/ams/upload', formData)
             .subscribe(
                      (response) => {
                        this.image = response;
                        console.log(this.image);
                        this.category.categoryImage = this.image.name;
                        this.response = 'File upload success.';
                        // Do something with the response from the server, if needed
                      },
                      (error) => {
                        this.response = 'File upload error: ' + error.status;
                        // Handle the error, if any
                      }
                    );
  

  }

  public onSubmit(){

    // this.category.categoryName = this.categoryName.value;
    // this.category.activeStatus = this.status;
    // this.category.categoryImage = this.image.type;

    // this.httpClient.post("http://localhost:5050/category",this.category)
    //                .subscribe((data : any)=>{
    //                    console.log(data);
    //                })
    this.service.addCategory(this.category,(response : any)=>{
        console.log(response);
    })
 

  }

}
