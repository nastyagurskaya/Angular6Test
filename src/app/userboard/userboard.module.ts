import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { SharedModule }       from '../shared/modules/shared.module';
import { ColorPickerModule } from "ngx-color-picker";
import { routing }  from './userboard.routing';
import { HomeComponent } from './home/home.component';
import { UserboardService } from './services/userboard.service';
import { MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { AuthGuard } from '../auth.guard';
import { PostsComponent } from './posts/posts.component';
import { EditComponent } from './posts/edit/edit.component';
import { DeleteDialog } from './posts/dialog-components/delete-dialog';
import { ShareDialog } from './posts/dialog-components/share-dialog';
import { CreateCheckPostDialog } from './posts/dialog-components/createcheckpost-dialog';
import { CreateComponent } from './posts/createpost/create.component';
import { EditCheckPostComponent } from './posts/editcheckpost/editcheckpost.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ColorPickerModule
  ],
  declarations: [HomeComponent, PostsComponent, EditComponent,DeleteDialog, CreateComponent,  ShareDialog, EditCheckPostComponent, CreateCheckPostDialog],
  exports:      [ColorPickerModule ],
  providers:    [AuthGuard,UserboardService],
  entryComponents: [
    DeleteDialog, PostsComponent,  ShareDialog, CreateCheckPostDialog
]
})
export class UserboardModule { }