import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserboardService } from 'src/app/userboard/services/userboard.service';

import {first} from "rxjs/operators";
import { finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { UserDetails } from '../../models/user.details';
import { Post } from '../../models/post';
@Component({
    selector: 'share-dialog',
    templateUrl: 'share-dialog.html',
  })
  export class ShareDialog {
    answer: boolean;
    users: UserDetails[];

    userId: UserDetails;
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
  //event handler for the select element's change event
    selectChangeHandler (event: any) {
        this.userId = event.target.value;
    }
    constructor(public dialogRef: MatDialogRef<ShareDialog>, @Inject(MAT_DIALOG_DATA) public data: any,private userboardService: UserboardService) 
    { 
        this.userboardService.getUsers().subscribe((userPosts: UserDetails[]) => {
        this.users = userPosts.filter(item => item.id != this.data.userCurId);
      }); 
    
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onYesClick(): void {
      this.submitted = true;
      this.isRequesting = true;
      this.errors='';
      this.userboardService.createUserPost(this.userId,this.data.post.id)
          .pipe(finalize(() => this.isRequesting = false))
          .subscribe(
          result => {         
            if (result) { 
                console.log("success");           
            }
          },
          error => this.errors = error);

      this.dialogRef.close();
    }
  }