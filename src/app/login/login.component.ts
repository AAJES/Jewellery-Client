import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { Home2Component } from '../Components/home2/home2.component';
import { Login, login, user } from '../commons/common.objects';
import { MainService } from '../Components/main.service';
import { OwnerComponent } from '../Components/owner/owner.component';
import { NewnavbarComponent } from '../newnavbar/newnavbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logIn: Login = {
    userName: '',
    password: '',
  };

  user : user = {
    userId: 0,
    userName: '',
    password: '',
    role: []
  }

  userData: any = '';
  token: any = '';
  public invalidUser: boolean = false;
  clientIP : any = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: NewnavbarComponent,
    public dialogRef: MatDialogRef<LoginComponent>,
    private service: MainService
  ) {
    this.service.getClientIP().subscribe((data: any) => {
      this.clientIP = data.ip; // Assuming the JSON response contains the IP address
    });
  }

  Username = new FormControl();
  Password = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.Username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.Password.hasError('Password') ? 'Not a valid Password' : '';
  }
  phone = new FormControl();

  valid: boolean = false;

  openDialog() {
    this.dialog.open(OwnerComponent, {
      data: {
        
      },
    });
  }

  systemDetails : any = '';

  login1 : login = {
    loginId: 0,
    systemDetails: '',
    user: {
      userId: 0,
      userName: '',
      password: '',
      role: []
    }
  }

  public onLogin(userName: string, password: string) {
    console.log(userName);
    this.logIn.userName = userName;
    this.logIn.password = password;

    

    console.log(this.logIn + 'kjdskfkdsfksdjfkdsj');

    // this.dialogRef.close();
    this.service.getUser(this.logIn, (data: any) => {
      this.userData = data;
      console.log(this.userData + 'kjdskfkdsfksdjfkdsj');
      if (this.userData.length == 0) {
        this.invalidUser = true;
      } else {
        console.log(JSON.stringify(this.userData));
        const jsonString = JSON.stringify(this.userData);
        const jsonObject = JSON.parse(jsonString);
        const jwtToken = jsonObject.jwtToken;
        console.log(jwtToken);
        localStorage.setItem('token', jwtToken);
        // localStorage.setItem('userName', userName);
        this.dialogRef.close();
        this.service.getUserByUserName(userName,(data : any)=>{
            console.log(data);
            this.user = data;
            this.service.getUserByUserName(this.logIn.userName,(data : any)=>{
              this.login1.user = data;
              this.service.setData(data.userId);
              this.service.getClientIP().subscribe((data: string) => {
                this.login1.systemDetails = data; // Assign the response to a property
                this.service.addLogin(this.login1,(data : any)=>{
                   console.log(data);
                   this.router.navigate(['/home',{data : this.user.userId}]);
                })
              });
          })
            
        })
        
      }
    });
  }
}
