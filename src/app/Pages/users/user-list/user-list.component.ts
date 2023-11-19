import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  users!: User[];
  isLoading: boolean = false;
  loadingTitle!: string;

  constructor(private userService: UserService){}
  ngOnInit(): void{
    this.getUsers();
  } 
  
  getUsers() {
    this.loadingTitle = "loading user ..."; 
    this.isLoading = true;
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.isLoading = false;
    });    
  }
  deleteUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(
      (res: any) => {
        this.getUsers();
      }
    )
  }
}
