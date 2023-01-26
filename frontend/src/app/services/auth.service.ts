import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {LoginResponseDto, UserTokenState} from "../model/LoginResponseDto";
import {LoginCredentials} from "../model/LoginCredentials";
import {User} from "../model/User";
import {LoginSocialCredentials} from "../model/LoginSocialCredentials";
import {RegisterCredentials} from "../model/RegisterCredentials";
import {VerifyCredentials} from "../model/VerifyCredentials";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authUrl: string;

  constructor(private http: HttpClient) {
    this.authUrl = 'http://localhost:8000/auth';
  }

  public login(user: LoginCredentials): Observable<LoginResponseDto> {
    const body = {
      "email": user.email,
      "password": user.password
    }
    return this.http.post<LoginResponseDto>(this.authUrl + '/login', body, AuthService.getHttpOptions());
  }

  public register(customer: RegisterCredentials): Observable<string> {
    return this.http.post<string>(this.authUrl + '/register', customer, AuthService.getHttpOptions());
  }

  public verify(credentials: string): Observable<string> {
    return this.http.get<string>(this.authUrl + `/verify/` + credentials, AuthService.getHttpOptions());
  }

  public loginSocial(user: LoginSocialCredentials): Observable<LoginResponseDto> {
    const body = {
      "email": user.email,
      "authToken": user.authToken,
      "firstName": user.firstName,
      "id": user.id,
      "idToken": user.idToken,
      "lastName": user.lastName,
      "name": user.name,
      "photoUrl": user.photoUrl,
      "provider": user.provider
    }
    return this.http.post<LoginResponseDto>(this.authUrl + '/login-social', body, AuthService.getHttpOptions());
  }

  public logout(token: UserTokenState): Observable<Object> {
    return this.http.post(this.authUrl + '/logout/' + token.accessToken, AuthService.getHttpOptions());
  }

  public getCurrentlyLoggedUser(): Observable<User> {
    return this.http.get<User>(this.authUrl + '/currently-logged-user', AuthService.getHttpOptions());
  }

  public static getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('token') || 'authkey',
        'Content-Type': 'application/json',
      })
    };
  }
}
