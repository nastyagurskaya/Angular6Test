import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Post } from '../models/post';
import { UserboardService } from '../services/userboard.service';
import {first} from "rxjs/operators";
import { finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
@Injectable({
  providedIn: 'root'
})
export class PostsComponent implements OnInit {
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  userPosts: Post[];
  constructor(private userboardService: UserboardService,public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }
  openDialog(post): void {
    let dialogRef = this.dialog.open(AppDialog, {
      width: '250px',
      data: {post: post}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  fetchData() {
    this.userboardService.getHomePosts().subscribe((userPosts: Post[]) => {
      this.userPosts = userPosts;
    });
}
  deletePost(post){
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userboardService.deletePost(post)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe( /*userPosts => {
          //const item = this.userPosts.find(item => item.id === idPost); 
           */
            
          
        result => {         
          if (result) {
            console.log('Post was deleted');
            const item = this.userPosts.find(item => item.id === post);  
    var index = this.userPosts.indexOf(item, 0);
    if (index > -1) {
       this.userPosts.splice(index, 1);
    }
            //const item = this.userPosts.find(item => item.id === idPost);  
            //this.userPosts=this.userPosts.splice(this.userPosts.indexOf(item)); 
           
            //this.userPosts= this.userPosts.splice(i => i !== post);
            //this.router.navigate(['/userboard/home']);
            // this.userboardService.getHomePosts().subscribe((userPosts: UserPosts) => {
            //   this.userPosts = userPosts;  }); 
          }
        },
        error => this.errors = error);
        // this.userboardService.getHomePosts().subscribe((userPosts: UserPosts) => {
        //   this.userPosts = userPosts;  }); 
        // const item = this.userPosts.find(item => item.id === idPost);  
        // this.userPosts=this.userPosts.splice(this.userPosts.indexOf(item));      
        // this.userPosts = this.userPosts.filter(item => item.id != idPost);
        // this.router.navigate(['/userboard/posts']);   
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'app-dialog.html',
})
export class AppDialog {
 
  constructor(
    public dialogRef: MatDialogRef<AppDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userboardService: UserboardService, private postsComp: PostsComponent,private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(post): void {
    
   this.postsComp.deletePost(post);
   
   //this.postsComp.fetchData();
  //this.router.navigate(['/userboard/posts']);
  //  this.userboardService.getHomePosts().subscribe((userPosts: UserPosts) => {
  //   this.postsComp.userPosts = userPosts;  }); 
    this.dialogRef.close();
  }
}