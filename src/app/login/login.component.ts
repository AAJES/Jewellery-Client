import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { Router } from "@angular/router";

import { Home2Component } from "../Components/home2/home2.component";
import { Login, login, user } from "../commons/common.objects";
import { MainService } from "../Components/main.service";
import { OwnerComponent } from "../Components/owner/owner.component";
import { NewnavbarComponent } from "../newnavbar/newnavbar.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  logIn: Login = {
    userName: "",
    password: "",
  };

  user: user = {
    userId: 0,
    userName: "",
    password: "",
    role: [],
  };

  userData: any = "";
  token: any = "";
  public invalidUser: boolean = false;
  clientIP: any = 0;
  @Inject(MAT_DIALOG_DATA) public data!: NewnavbarComponent
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
   
    public dialogRef: MatDialogRef<LoginComponent>,
    private service: MainService
  ) {
    this.service.getClientIP().subscribe((data: any) => {
      this.clientIP = data.ip; // Assuming the JSON response contains the IP address
    });
  }

  Username = new FormControl();
  Password = new FormControl("", [Validators.required]);
  getErrorMessage() {
    if (this.Username.hasError("required")) {
      return "You must enter a value";
    }
    return this.Password.hasError("Password") ? "Not a valid Password" : "";
  }
  phone = new FormControl();

  valid: boolean = false;

  openDialog() {
    this.dialog.open(OwnerComponent, {
      data: {},
    });
  }

  systemDetails: any = "";

  login1: login = {
    loginId: 0,
    systemDetails: "",
    user: {
      userId: 0,
      userName: "",
      password: "",
      role: [],
    },
  };

  public onLogin(userName: string, password: string) {
    console.log(userName);
    this.logIn.userName = userName;
    this.logIn.password = password;
    this.user.userName = userName;


    // this.dialogRef.close();
    this.service.getUser(this.logIn, (data: any) => {
      this.userData = data;
      if (this.userData.length === 0) {
        this.invalidUser = true;
        this.toastr.error('Invalid username or password.', 'Error');
      } else {
        const jsonString = JSON.stringify(this.userData);
        const jsonObject = JSON.parse(jsonString);
        const jwtToken = jsonObject.jwtToken;
        sessionStorage.setItem("token", jwtToken);
        sessionStorage.setItem("userName", this.user.userName);

        this.dialogRef.close();
        this.service.getUserByUserName(userName, (data: any) => {
          this.user = data;
          this.service.getUserByUserName(this.logIn.userName, (data: any) => {
            this.login1.user = data;
            this.service.setData(data.userId);
            this.service.getClientIP().subscribe((data: string) => {
              this.login1.systemDetails = data;
              this.service.addLogin(this.login1, (data: any) => {
                this.toastr.success('Login successful!', 'Success');
                this.router.navigate(["/home3", { data: this.user.userId }]);
                window.location.reload(); 
              });
            });
          });
        });
      }
    });
  }
}
