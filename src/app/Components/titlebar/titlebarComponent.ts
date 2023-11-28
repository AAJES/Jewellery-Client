import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
  import {NgIf} from '@angular/common';
  import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf],
})

export class titlebarComponent {
  Username = new FormControl;
  Password = new FormControl('', [Validators.required,]);
  getErrorMessage() {
    if (this.Username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.Password.hasError('Password') ? 'Not a valid Password' : '';
  }
  phone = new FormControl

 

}
