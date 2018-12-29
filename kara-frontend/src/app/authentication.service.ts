import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User } from "./models/user";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerAsync(formData: any): Observable<any> {
    return this.http.post("http://localhost:3000/user/register", formData).pipe(
      catchError(err => {
        console.log("Get failed", err);
        throw new Error("");
      })
    );
  }

  loginAsync(formData: any): Observable<User> {
    return this.http
      .post<User>("http://localhost:3000/user/auth/token", formData)
      .pipe(
        catchError(err => {
          console.log("Post failed", err);
          throw new Error("Login failed");
        })
      );
  }
}
