import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Post } from '../models/post';
import { CheckPost } from '../models/checkpost';
import { UserboardService } from '../services/userboard.service';
import { first } from "rxjs/operators";
import { finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core'

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DeleteDialog } from './dialog-components/delete-dialog';
import { ShareDialog } from './dialog-components/share-dialog';
import { UserDetails } from '../models/user.details';
import { CreateCheckPostDialog } from './dialog-components/createcheckpost-dialog';
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
  userId: number;
  userCheckPosts: any[];
  userCheckItems: any[];
  userSharedPosts: any[];
  items: any[];
  searchValue: string;
  answer: boolean = false;
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
  ngOnInit() {
    this.fetchData();
  }
  openSharePostDialog(post): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'dialogSharePanel';

    dialogConfig.data = { post: post, userCurId: this.userId };

    let dialogRef = this.dialog.open(ShareDialog, dialogConfig);
  }
  openDialogCreateCheckPost(): void {
    let dialogRef = this.dialog.open(CreateCheckPostDialog, {
      panelClass:'dialogCreatePanel',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogPost(post): void {
    let dialogRef = this.dialog.open(DeleteDialog, {
      panelClass:'dialogDeletePanel',
      data: { post: post }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result === true) this.deletePost(post.id);
    });
  }
  openDialogChekedPost(post): void {
    let dialogRef = this.dialog.open(DeleteDialog, {
      panelClass:'dialogDeletePanel',
      data: { post: post }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result === true) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors='';
      this.userboardService.deleteCheckPost(post.id)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe( result => {         
          if (result) {
            console.log('Post was deleted');  
            this.userCheckPosts = Object.assign([], this.userCheckPosts).filter(
              item => item.id != post.id
           )  
          }
        },
        error => this.errors = error);
      }
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
    this.userboardService.getSharedPosts().subscribe(( userSharedPosts: Post[]) => {
      this.userSharedPosts =  userSharedPosts;
    });
    this.userboardService.getHomeDetails()
    .subscribe((userDetails: UserDetails) => {
      this.userId = userDetails.id;
    });
}
  deletePost(postId){
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userboardService.deletePost(postId)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe( result => {         
          if (result) {
            console.log('Post was deleted');  
            this.userPosts = Object.assign([], this.userPosts).filter(
              item => item.id != postId 
           )  
          }
        },
        error => this.errors = error);
  }
}


