import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { UserDetails } from '../models/home.details.interface'; 
import { UserPosts } from '../models/home.user.posts.interface'; 
import { Post } from '../models/post'; 
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserboardService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<UserDetails> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);
  
    return this.http.get(this.baseUrl + "/users/home",{headers})
      .pipe(map(response => response.json()))
      .catch(this.handleError);
  }
  getHomePosts()/*: Observable<UserPosts>*/ {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.get(this.baseUrl + "/users/posts",{headers})
    .pipe(map(response => response.json()))
    .catch(this.handleError);
}
getEditedPost(idPost): Observable<Post> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);

return this.http.get(this.baseUrl + "/posts/"+idPost,{headers})
  .pipe(map(response => response.json()))
  .catch(this.handleError);
}
deletePost(idPost) : Observable<boolean>{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
 console.log('Post was deleted from delete method');
return this.http.delete(this.baseUrl + "/posts/delete/" + idPost,{headers}).pipe(map(response => true))
  .catch(this.handleError);
}
updatePost(id, title, body): Observable<boolean> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ id, title, body });
  return this.http.post(this.baseUrl + "/posts/update", bodyP, {headers}).pipe(map(res => true),
  catchError(this.handleError));
}
createPost(title, body, color): Observable<boolean> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ title, body, color });
  return this.http.post(this.baseUrl + "/posts/create", bodyP, {headers}).pipe(map(res => true),
  catchError(this.handleError));
}
}