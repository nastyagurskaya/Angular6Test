import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/user.details';
import { UserboardService } from '../services/userboard.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails: UserDetails;

  constructor(private userboardService: UserboardService) { }

  ngOnInit() {

    this.userboardService.getHomeDetails()
    .subscribe((userDetails: UserDetails) => {
      this.userDetails = userDetails;
    },
    error => {
      //this.notificationService.printErrorMessage(error);
    });
    
  }

}
