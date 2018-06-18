import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { HomeComponent }    from './home/home.component'; 
import { PostsComponent }    from './posts/posts.component'; 
import { EditComponent }    from './posts/edit/edit.component'; 
import { CreateComponent }    from './posts/create/create.component'; 
import { AuthGuard } from '../auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
      path: 'userboard/home',
      component: HomeComponent, canActivate: [AuthGuard]
    },
    {
      path: 'userboard/posts',
      component: PostsComponent, canActivate: [AuthGuard]    
    },
    {
      path: 'userboard/posts/edit/:id',
      component: EditComponent, canActivate: [AuthGuard]
    },
    {
      path: 'userboard/posts/create',
      component: CreateComponent, canActivate: [AuthGuard]
    },
    // {
    //   path: 'userboard/home',
    //   component: HomeComponent, canActivate: [AuthGuard],
    // //   children: [      
    // //    { path: '', component: HomeComponent },
    // //    { path: 'home',  component: HomeComponent },
    // //   ]       
    // }  
]);