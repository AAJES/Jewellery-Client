import { Component, OnInit } from "@angular/core";
import { BankDetails, Shop } from "src/app/commons/common.objects";
import { MainService } from "../../main.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-bankdetails",
  templateUrl: "./bankdetails.component.html",
  styleUrls: ["./bankdetails.component.css"],
})
export class BankdetailsComponent implements OnInit {
  bankDetails: BankDetails = {
    bankDetailsId: 0,
    ifsccode: "",
    accountNo: "",
    accountHolderName: "",
    branch: "",
    branchAddress: "",
    qrCode: "",
    description: "",
    active: false,
  };

  shopeList: any[] = [];
  shope: Shop = {
    shopId: 0,
    shopName: "",
    logo: "",
    address: "",
    phone: "",
    email: "",
    state: "",
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
  selectedFile: any;
  image: any;
  response: string = "";
  imageData: any;
  bankDetailsId: any = 0;


  constructor(
    private service: MainService,
    private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getAllShop((data: any) => {
      this.shopeList = data;

      this.shope = this.shopeList[0];
      console.log(this.shope);
    });

    this.route.paramMap.subscribe((params) => {
      const bankDetailsId = params.get("data");
      console.log(bankDetailsId);
      this.bankDetailsId = bankDetailsId;
      if (bankDetailsId) {
        // Edit Booking
        this.service.getBankDetailsById(bankDetailsId, (data: any) => {
          console.log(data);
          this.bankDetails = data;
         
        });
      } else {
        // Handle the case where bookingId is not available
      }
    });
  }

  public onToggle() {
    this.bankDetails.active = true;
  }

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

    // Replace 'your-upload-url' with the actual URL of your server-side file upload endpoint
    this.httpClient
      .post<any>("http://localhost:5050/ams/upload", formData)
      .subscribe((response) => {
        this.image = response;
        console.log(this.image);
        this.bankDetails.qrCode = this.image.name;
        this.response = "File upload success.";

        this.service
          .getImageFromServer(this.bankDetails.qrCode)
          .subscribe((imageData: ArrayBuffer) => {
            const imageBlob = new Blob([imageData], { type: "image/jpeg" });
            this.imageData = URL.createObjectURL(imageBlob);
            console.log("image");
          });
      });
  }

  public onSubmit() {
    const shopId = this.shope.shopId;
    console.log(this.bankDetailsId);

   


    if(this.bankDetailsId == null){
      this.service.addBankDetails(shopId, this.bankDetails, (data: any) => {
        
        console.log(data);
        this.router.navigate(["/bankDetailsall"]);
      });
    }else {
      this.service.updateBankDetails(this.bankDetailsId,this.bankDetails,(data:any)=>{
        console.log("Update Successful")
        this.router.navigate(['/bankDetailsall']);
      })
    }
  }
}
