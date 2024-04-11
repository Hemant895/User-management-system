import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css'],
})
export class UserUpsertComponent implements OnInit {
  userForm: FormGroup | any;
  submitted = false;
  user: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userservice: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    //  create form group
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      address: ['', Validators.required],
    });

    //  Edit mode
    this.user = history.state.user;
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  //  Function to check the validation of the form
  get f() {
    return this.userForm.controls;
  }

  //   Function to navigate to userist page
  goto() {
    this.router.navigate(['userupsert/userlist']);
  }

  //  Function for submitting the form
  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.spinner.show();
    if (this.userForm.valid) {
      const user: User = this.userForm.value;

      //  If it is an edit operation then update the data
      this.userservice.getUserByEmail(user.email).subscribe({
        next: (existingUser) => {
          if (this.user && existingUser) {
            this.spinner.hide();
            this.toastr.success('User already exist');

            user._id = existingUser._id;

            //  Update the user details in database
            this.userservice.updateUser(user).subscribe((updatedUser) => {
              console.log('User updated:', updatedUser);
              this.toastr.success('User updated successfully');
              this.userForm.reset();
              this.goto();
            });
          } else {
            //   Save the new user details in database
            this.userservice.addUser(user).subscribe((newUser) => {
              this.toastr.success('User created successfully');
              console.log('User created:', newUser);
              this.userForm.reset();
              this.goto();
            });
          }
        },
        error: (error) => {
          this.toastr.error(error);
        },
      });
    }
  }
}
