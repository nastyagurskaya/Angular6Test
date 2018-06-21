import { Component, OnInit } from '@angular/core';
import { UserboardService } from 'src/app/userboard/services/userboard.service';
import { Router, ActivatedRoute } from "@angular/router";

import { CheckPost } from 'src/app/userboard/models/checkpost';
import { CheckItem } from 'src/app/userboard/models/checkitem';
import {first} from "rxjs/operators";
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-editcheckpost',
  templateUrl: './editcheckpost.component.html',
  styleUrls: ['./editcheckpost.component.scss']
})
export class EditCheckPostComponent implements OnInit {

  checkItemId: number;
  checkPostId: number;
  checkPost: CheckPost;
  itemBody: string;
  checkItems: CheckItem[];
  checkItem: CheckItem;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  color = '#ff0000';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserboardService) {
    this.activatedRoute.params.subscribe( params => this.checkPostId = params.id );
  }
  ngOnInit() {
    this.userService.getEditedCheckPost(this.checkPostId).subscribe(
      data => this.checkPost = data 
    );
    this.fetchData();
  }
  fetchData(){
    this.userService.getCheckItemsByPostId(this.checkPostId).subscribe(
      data => this.checkItems = data 
    );
  }
  newCheckItem(itemBody){
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    console.log(itemBody + this.checkPostId);
    this.userService.createCheckItem(this.checkPostId,itemBody)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
        result => {         
          if (result!=undefined) {
            console.log("Item created"); 
            this.checkItemId = result; 
            this.checkItem = new CheckItem();
            this.checkItem.id = this.checkItemId;
            this.checkItem.checked = false;
            this.checkItem.body = itemBody;
            console.log(this.checkItem);
            this.checkItems.push(this.checkItem)          
          }
        },
        error => this.errors = error);
       
  }
  onCancelClick(){
    this.router.navigate(['/userboard/posts']);     
  }
  deleteItem(itemId){
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userService.deleteCheckItem(itemId)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe( result => {         
          if (result) {
            console.log('Post was deleted');  
            this.checkItems = Object.assign([], this.checkItems).filter(
              item => item.id != itemId
           )  
          }
        },
        error => this.errors = error);
  }
  updateCheckItem(item){
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    let checked: boolean;
    checked = !item.checked;
    console.log(checked);
    this.userService.updateCheckItem(item.id, checked, item.body, this.checkPostId)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
        result => {         
          if (result) { 
                  
          }
        },
        error => this.errors = error);
        item.checked = checked;
        
  }
  editCheckPost() {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    this.userService.updateCheckPost(this.checkPostId, this.checkPost.title, this.checkPost.color)
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
