import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserboardService } from 'src/app/userboard/services/userboard.service';
import {first} from "rxjs/operators";
import { finalize } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
  })
  export class DeleteDialog {
    answer: boolean;
    constructor(public dialogRef: MatDialogRef<DeleteDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onNoClick(): void {
     this.data.answer = false;
      this.dialogRef.close(false);
    }
    onYesClick(): void {
      this.data.answer = true;
      this.dialogRef.close(true);
    }
  }