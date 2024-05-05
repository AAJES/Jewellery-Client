import { HttpClient } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MainService } from "../main.service";
import { Owner } from "src/app/commons/common.objects";
import { LoginComponent } from "src/app/login/login.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-owner",
  templateUrl: "./owner.component.html",
  styleUrls: ["./owner.component.css"],
})
export class OwnerComponent {
  //Owner : FormGroup | any;
  //service: any;

  owner: Owner = {
    ownerId: 0,
    phone: "",
    password: "",
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
    ownerName: "",
  };
  ownerId: any = 0;

  constructor(
    private service: MainService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const ownerId = params.get("data");
      console.log(ownerId);
      if (ownerId) {
        
        this.ownerId = ownerId;

        this.service.getOwnerById(ownerId, (data: any) => {
          console.log(data);
          this.owner = data;
        });
      } else {
        // Handle the case where bookingId is not available
      }
    });
  }

  public onSubmit() {
    


    if(this.ownerId == 0){
      this.service.addOwner(this.owner, (data: any) => {
        console.log(data);
        this.router.navigate(["/allowners"]);
      });
    }else{
      this.service.updateOwner(this.ownerId,this.owner,(data:any)=>{
        console.log("Update Successful")
        this.router.navigate(['/allowners']);
      })
    }
  }
}
