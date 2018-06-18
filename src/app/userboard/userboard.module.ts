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
import { AppDialog } from './posts/posts.component';
import { CreateComponent } from './posts/create/create.component';

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
  declarations: [HomeComponent, PostsComponent, EditComponent,AppDialog, CreateComponent],
  exports:      [ColorPickerModule ],
  providers:    [AuthGuard,UserboardService],
  entryComponents: [
    AppDialog, PostsComponent
]
})
export class UserboardModule { }