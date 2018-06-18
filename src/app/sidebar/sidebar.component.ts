import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;
  subscription:Subscription;
  status: boolean;
  constructor(private router: Router, private userService:UserService) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
  }


  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
  }
  logout() {
    this.userService.logout();       
 }
}
