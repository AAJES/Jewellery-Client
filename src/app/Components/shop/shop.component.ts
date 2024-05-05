import { formatCurrency } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ImageModel, Shop } from "src/app/commons/common.objects";
import { MainService } from "../main.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  // public myForm: FormGroup | any;
  //   shop: FormGroup | any ;

  shop: Shop = {
    shopId: 0,
    shopName: "",
    logo: "",
    address: "",
    email: "",
    state: "",
    phone: "",
    gstNo: "",
    panNo: "",
    bankDetails: {
      bankDetailsId: 0,
      ifsccode: "",
      accountNo: "",
      accountHolderName: "",
      branch: "",
      branchAddress: "",
      qrCode: "",
      description: "",
      active: false
    }
  };

  imageData: any = "";
  netWeight1: any;
  bankDetailsList: any;
  shopId: any;

  constructor(
    private service: MainService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params["data"];
       this.shopId = id;
      this.service.getShopById(id, (data: any) => {
        console.log("Getting data by Id");
        console.log(JSON.stringify(data));
        this.shop = data;
        this.selectedBank = data.bankDetails.bankDetailsId;
      });
      console.log("Retrieved ID:", id);
    });



    this.service.getAllBankDetails((data : any)=>{
      this.bankDetailsList = data;
    })
  }

  // public myError = (controlName: string, errorName: string) =>{
  // return this.myForm.controls[controlName].hasError(errorName);
  // }

  // public onSubmit() : any{
  //   console.log(this.onSubmit)
  // }
  selectedBank: number | null = null;

  public onAddBankDetails() {
    console.log("Entity selected : " + this.selectedBank);
    

    this.service.getBankDetailsById(this.selectedBank, (data: any) => {
      console.log(data);
      this.shop.bankDetails = data;
    });
  }

  shoppe: any = {};

  image: ImageModel = {
    id: 0,
    name: "",
    type: "",
  };

  selectedFile: File | null = null;
  response: string = "";

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFile = selectedFile;
      this.imageUpload();
    }
  }

  public imageUpload() {
    const fileInput = document.querySelector<HTMLInputElement>("#fileInput");
    const file = fileInput?.files?.[0];

    if (!this.selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this.httpClient
    .post<any>("http://localhost:5050/ams/upload", formData)
    .subscribe((response) => {
      this.image = response;
      console.log(this.image);
      this.shop.logo = this.image.name;
      this.response = "File upload success.";

      this.service
        .getImageFromServer(this.shop.logo)
        .subscribe((imageData: ArrayBuffer) => {
          const imageBlob = new Blob([imageData], { type: "image/jpeg" });
          this.imageData = URL.createObjectURL(imageBlob);
          console.log("22222222222222222222222222222222222222222222222222")
          console.log(this.imageData);
          console.log("image");
        });
    });
  }

  public onSubmit() {
  console.log(this.shop)


    if(this.shopId == 0){
      this.service.addShop(this.shop, (data: any) => {
        console.log(data);
        this.router.navigate(['/shopdetails'])
      });
    }else{
      this.service.updateShop(this.shopId,this.shop,(data:any)=>{
        console.log("Update Successful")
        this.router.navigate(['/shopdetails']);
      })
    }
  }
}
