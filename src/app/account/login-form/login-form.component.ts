import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLogin } from '../../shared/models/user.login.interface';
import { UserService } from '../../shared/services/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: UserLogin = { userName: '', password: '' };

  constructor(private userService: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
     // subscribe to router event
     this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.brandNew = param['brandNew'];   
         this.credentials.userName = param['userName'];         
      });      
  }
  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  loginUser({ value, valid }: { value: UserLogin, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if (valid) {
      this.userService.login(value.userName, value.password)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
        result => {         
          if (result) {
             this.router.navigate(['/userboard/home']);             
          }
        },
        error => this.errors = error);
    }
  }
}
