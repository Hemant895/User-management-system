import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://quickorder-backend.vercel.app/users/';

  //  Get all email addresses of user if already exists
  getUserByEmail(email: any) {
    const url = this.apiUrl + 'userlist';
    return this.http
      .get<User[]>(url)
      .pipe(map((users) => users.find((user) => user.email === email)));
  }

  // get userlist from api
  getUsers() {
    return this.http.get(this.apiUrl + 'userlist');
  }

  //  Add new user to the database
  addUser(user: any): Observable<User[]> {
    return this.http.post<User[]>(this.apiUrl + 'createuser', user);
  }

  // Update userdetails using id in databse
  updateUser(user: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.apiUrl}${user._id}`, user);
  }

  // delete user using id
  deleteUser(_id: string): Observable<User[]> {
    return this.http.delete<User[]>(`${this.apiUrl}${_id}`);
  }
}
