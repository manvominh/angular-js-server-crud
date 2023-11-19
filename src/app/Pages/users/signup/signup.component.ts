import { UserService } from './../../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

function validInteger(control : any) {
  const value = control.value;
  if (value === null || value === '') {
    return null; // Allow empty input
  }
  const isValid = !isNaN(value) && Number.isInteger(Number(value));
  return isValid ? null : { invalidInteg: true };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;
  isLoading: boolean = false;
  loadingTitle: string = 'Loading ...';

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
       name: ['', Validators.required],
       email: ['', Validators.required],
       phone: ['', [Validators.required, validInteger]],
       country: ['', Validators.required],
       address: ['', Validators.required],
       gender: ['', Validators.required],      
                 
    });
 }
 constructor(private userService: UserService,
   private formBuilder: FormBuilder,
   private router: Router) { }

   errors : any = []

   public createUser() {
    console.log("save pressed");
    this.isLoading = true;
    this.loadingTitle = "Creating a new user ....";
    if (this.userForm.valid) { 
      
      this.userService.createUser(this.userForm.value).subscribe({
              next: (res: any) => {
                this.router.navigate(['/user-list']);
              },
              error: (err: any) => {
                this.errors = err.error.errors;
              }
      });
      
      this.isLoading = false;
    }
    else {
      this.isLoading = false;
      this.userForm.markAllAsTouched();
    }
    
  }
}
