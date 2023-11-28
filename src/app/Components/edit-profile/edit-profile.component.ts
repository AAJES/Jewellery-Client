import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  profileForm: any;
  imgSrc: any = '../../../assets/ajes.jpg';
  selectedImg: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      image: [''], // You can add validation for the image if needed
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['ro@'],
      altEmail: ['', Validators.email],
      phone: [''],
      company: [''],
      place: ['']
    });
  }

  fullName = new FormControl('', [Validators.required]);
  // lastName = new FormControl('', [Validators.required]);

  fullNameError() {
    if (this.fullName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.fullName.hasError('email') ? 'Not a valid email' : '';
  }

  // lastNameError() {
  //   if (this.lastName.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.lastName.hasError('email') ? 'Not a valid email' : '';
  // }
  
  alternateEmailId = new FormControl('', [ Validators.email]);
  alternateEmailIdError() {
    return this.alternateEmailId.hasError('email') ? 'Not a valid email' : '';
  }


  phoneNo = new FormControl('', [Validators.required]);
  phoneNoError() {
    if (this.phoneNo.hasError('required')) {
      return 'You must enter a value';
    }
    return this.phoneNo.hasError('email') ? 'Not a valid email' : '';
  } 

  companyName = new FormControl('', [Validators.minLength(100)]);
  companyNameError() {
      return this.companyName.hasError('minLength') ? 'It should be min 100 Character' : '';
  } 

  place = new FormControl('', [Validators.minLength(50)]);
  placeError() {
    return this.place.hasError('minLength') ? 'It should be Minimum 50 character' : '';
  } 
  

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }
}
