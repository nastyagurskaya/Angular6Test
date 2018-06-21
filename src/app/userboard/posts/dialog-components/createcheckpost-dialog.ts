import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserboardService } from 'src/app/userboard/services/userboard.service';
import {first} from "rxjs/operators";
import { CheckPost } from 'src/app/userboard/models/checkpost';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
    selector: 'createcheckpost-dialog',
    templateUrl: 'createcheckpost-dialog.html',
  })
  export class CreateCheckPostDialog {

    checkPost: CheckPost;
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    color = '#ff0000';
    constructor(public dialogRef: MatDialogRef<CreateCheckPostDialog>, @Inject(MAT_DIALOG_DATA) public data: any,private router: Router, private activatedRoute: ActivatedRoute, private userService: UserboardService) { }

    onCancelClick(): void {
      this.dialogRef.close();
    }
   
    createCheckPost({ value }: { value: CheckPost}) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors='';
        this.userService.createCheckPost(value.title, this.color)
            .pipe(finalize(() => this.isRequesting = false))
            .subscribe(
            result => {         
              if (result!=0) {
                 this.router.navigate(['/userboard/posts/editcheckpost/'+result]);             
              }
            },
            error => this.errors = error);
            this.dialogRef.close();
      }
      
  }