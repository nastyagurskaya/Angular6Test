import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

// Add the RxJS Observable operators we need in this app.


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService/*, private http: HttpClient*/) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  register(email: string, password: string, firstName: string, lastName: string,userName: string, phoneNumber: string)/*: Observable<UserRegistration>*/ {
    let body = JSON.stringify({ email, password, firstName, lastName, userName, phoneNumber });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + "/accounts", body, options).pipe(map(res => true),
    catchError(this.handleError));
   
  }  

  login(userName, password): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ userName, password });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + '/auth/login',
      body , options).pipe(map(res => res.json()), map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      }),map(res=>true),
      catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

