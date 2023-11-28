import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  sidenavWidth: string = '0px'; // Left side navigation width
  rightsidenavWidth: string = '0px'; // Right side navigation width (initially hidden)
  contentMargin: string = '0px'; // Margin for main content area
  rightSidenavPosition: string = '0'; // Starting position for right side navigation (slide in from the left)
  loggedInUsername: any;
  userid: any;

  constructor(
    private dialog: MatDialog,
    private toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: MainService
  ) {}
  ngOnInit() {
    this.loggedInUsername = localStorage.getItem('loggedInUsername');

    // this.userService.getUserByUserName(this.loggedInUsername).subscribe((user) => {
    //   this.userid = user.id;
    //   console.log('User ID is ' + JSON.stringify(this.userid));
    //   console.log('User Details ' + JSON.stringify(user.id));
    //   // Initialize the form or handle user data as needed
    // });
  }

  isLoggedIn: boolean = true;

  flag1: any;
  public OnClick1() {
    this.flag1 = !this.flag1;
  }

  flag2: any;
  public OnClick2() {
    this.flag2 = !this.flag2;
  }

  flag3: any;
  public OnClick3() {
    this.flag3 = !this.flag3;
  }

  editProfile() {
    // Implement your edit profile logic here.
  }

  logout() {
    this.userService.logout();
    this.toster.success('Successfully Logout');
    this.router.navigate(['/']);
    // Implement your logout logic here.
  }
  openNav() {
    this.sidenavWidth = '250px';
    this.contentMargin = '250px';
  }

  // Function to close left side navigation
  closeNav() {
    this.sidenavWidth = '0px';
    this.contentMargin = '0px';
  }

  // Function to open right side navigation (now opens from the left)
  openRightNav() {
    this.rightsidenavWidth = '250px';
    this.rightSidenavPosition = '0'; // Slide in from the left
  }

  // Function to close right side navigation (now closes to the left)
  closeRightNav() {
    this.rightsidenavWidth = '0px';
    this.rightSidenavPosition = '0'; // Slide out to the left
  }

  openEditProfile(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(EditProfileComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openConfirmPass(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    // this.dialog.open(ChangePassComponent, {
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    // });
  }
}
