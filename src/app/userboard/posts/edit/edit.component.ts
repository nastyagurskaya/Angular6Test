import { Component, OnInit } from '@angular/core';
import { UserboardService } from 'src/app/userboard/services/userboard.service';
import { Router, ActivatedRoute } from "@angular/router";

import { Post } from 'src/app/userboard/models/post';
import {first} from "rxjs/operators";
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  postId: number;
  post: Post;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserboardService) {
    this.activatedRoute.params.subscribe( params => this.postId = params.id );
   }

  ngOnInit() {
    this.userService.getEditedPost(this.postId).subscribe(
      data => this.post = data 
    );
  }
  onCancelClick(){
    this.router.navigate(['/userboard/posts']);     
  }
  editPost() {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userService.updatePost(this.postId, this.post.title, this.post.body, this.post.color)
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