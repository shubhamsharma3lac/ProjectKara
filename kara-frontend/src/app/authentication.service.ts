import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  registerUserAsync(data: {}): Promise<any>{
    let options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return this.http.post('http://localhost:3000/signup', data, options).toPromise();
  }

  loginUserAsync(data: {}): Promise<any>{
    return this.http.post('http://localhost:3000/login', data).toPromise();
  }
}
