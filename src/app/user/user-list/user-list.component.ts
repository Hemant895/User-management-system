import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  userdata: any;
  constructor(
    private userservice: UserService,
    private toastr: ToastrService,
    private router:Router,
    private spinner : NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  
  
// get userlist data from api
  getUserList() {
    this.spinner.show()
    this.userservice.getUsers().subscribe({
      next: (res: any) => {
        this.spinner.hide()
        console.log('Data Received', res);
        this.toastr.success('Data Received Successfully', 'Success');
        this.userdata = res;
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
  }

  // delete data 
  deleteUser(userId: any): void {
    this.spinner.show()
    this.userservice.deleteUser(userId).subscribe({
      next: (res: any) => {
        this.spinner.hide()
        this.userdata = res;
        this.toastr.success(
          `User with ID ${this.userdata.email} deleted Successfully`,
          'Success'
        );
        this.getUserList();
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
    }
  

  // open modal for add user and navigate to userupsert page
  editUser(user: any): void {
    this.router.navigate(['/userupsert'], { state: { user } });
  }
}
