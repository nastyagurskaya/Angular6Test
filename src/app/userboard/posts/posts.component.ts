import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Post } from '../models/post';
import { CheckPost } from '../models/checkpost';
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
  userPosts: any[];
  userCheckPosts: any[];
  userCheckItems: any[];
  items: any[];
  searchValue: string;
  values = '';
  constructor(private userboardService: UserboardService,public dialog: MatDialog, private router: Router) { }
  assignCopy(){
    this.userPosts = Object.assign([], this.userPosts);
 }
 filterItem(value){
    if(!value) this.userPosts = this.items;
    this.userPosts = Object.assign([], this.userPosts).filter(
       item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 ||  item.body.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 } 

  searchClick(){
    alert(this.searchValue);
   }
  ngOnInit() {
    this.fetchData();
  }
  openDialogPost(post): void {
    let dialogRef = this.dialog.open(AppDialog, {
      width: '250px',
      data: { post: post.id }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  fetchData() {
    this.userboardService.getHomePosts().subscribe((userPosts: Post[]) => {
      this.userPosts = userPosts;
    });
    this.userboardService.getHomePosts().subscribe(( items: Post[]) => {
      this.items =  items;
    });
    this.userboardService.getHomeCheckPosts().subscribe(( userCheckPosts: CheckPost[]) => {
      this.userCheckPosts =  userCheckPosts;
    });
    this.userboardService.getCheckItems().subscribe(( userCheckItems: any[]) => {
      this.userCheckItems =  userCheckItems;
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
            this.router.navigate(['/userboard/home']);
          }
        //     }
            //const item = this.userPosts.find(item => item.id === idPost);  
            //this.userPosts=this.userPosts.splice(this.userPosts.indexOf(item)); 
           
            //this.userPosts= this.userPosts.splice(i => i !== post);
            //this.router.navigate(['/userboard/home']);
            // this.userboardService.getHomePosts().subscribe((userPosts: UserPosts) => {
            //   this.userPosts = userPosts;  }); 
        },
        error => this.errors = error);
        //alert(this.userPosts);
        // //this.userPosts = [new Post()];
        // this.fetchData();
        // this.userboardService.getHomePosts().subscribe((userPosts: Post[]) => {
        //   this.userPosts = userPosts;
        // });
        // alert(this.userPosts);

        // const item = this.userPosts.find(item => item.id === post);  
        // var index = this.userPosts.indexOf(item, 0);
        // if (index > -1) {
        //    this.userPosts.splice(index, 1);
        // }
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
   
   this.postsComp.fetchData();
  
    this.dialogRef.close();
  }
}