import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Pages/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  constructor(private httpClient: HttpClient) { }


  getUsers(){
    return this.httpClient.get<User[]>(this.apiUrl);
  }
  createUser = (createdData: User) => this.httpClient.post<User>(`${this.apiUrl}`, createdData);
  getUser = (userId: number) => this.httpClient.get<User>(`${this.apiUrl}/${userId}`);
  updateUser = (updateData: User, userId: number) => this.httpClient.put<User>(`${this.apiUrl}/${userId}`, updateData);
  deleteUser= (id: number) => this.httpClient.delete(`${this.apiUrl}/${id}`);
}
