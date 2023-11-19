import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user.service';

function validInteger(control : any) {
  const value = control.value;
  if (value === null || value === '') {
    return null; // Allow empty input
  }
  const isValid = !isNaN(value) && Number.isInteger(Number(value));
  return isValid ? null : { invalidIntege: true };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userId !: any;
  user!: any;
  userForm!: FormGroup;
  isLoading: boolean = false;
  loadingTitle: string = 'Loading ...';
  errors: any;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
    private router: Router) {
    
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', [Validators.required, validInteger]],
        country: ['', Validators.required],
        address: ['', Validators.required],
        gender: ['', Validators.required],              
                  
      });
  }
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getUser(this.userId).subscribe(
      (res: any) => {
        this.user = res;
        this.userForm.patchValue(this.user);

      }
    );
  }
  updateUser() {
    this.isLoading = true;
    this.loadingTitle = "Update a user ....";
    if (this.userForm.valid) { 
      
      this.userService.updateUser(this.userForm.value, this.userId).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.router.navigate(['/user-list']);
        },
        error: (err: any) => {
          this.errors = err.error.errors;
          console.log('err', this.errors);
          console.log('Name', this.errors.Name)
        }
      });
      
      
    }
    else {
      this.isLoading = false;
      this.userForm.markAllAsTouched();
    }
  }
}
