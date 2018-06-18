import { Component, OnInit } from '@angular/core';
import { UserboardService } from 'src/app/userboard/services/userboard.service';
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from 'src/app/userboard/models/post';
import {first} from "rxjs/operators";
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  post: Post;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  color = '#ff0000';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserboardService) {
   }

  ngOnInit() {
  }

  createPost({ value }: { value: Post}) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userService.createPost(value.title, value.body, this.color)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
        result => {         
          if (result) {
             this.router.navigate(['/userboard/posts']);             
          }
        },
        error => this.errors = error);
  }

}