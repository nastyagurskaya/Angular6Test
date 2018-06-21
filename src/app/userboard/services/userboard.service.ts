import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { UserDetails } from '../models/user.details'; 
import { Post } from '../models/post'; 
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { CheckPost } from '../models/checkpost';
@Injectable({
  providedIn: 'root'
})
export class UserboardService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }
  getUsers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

  return this.http.get(this.baseUrl + "/users",{headers})
    .pipe(map(response => response.json()))
    .catch(this.handleError);
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

  return this.http.get(this.baseUrl + "/posts",{headers})
    .pipe(map(response => response.json()))
    .catch(this.handleError);
}
getHomeCheckPosts(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);

return this.http.get(this.baseUrl + "/checkposts",{headers})
  .pipe(map(response => response.json()))
  .catch(this.handleError);
}
getCheckItems(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);

return this.http.get(this.baseUrl + "/checkposts/checkitems",{headers})
  .pipe(map(response => response.json()))
  .catch(this.handleError);
}
getCheckItemsByPostId(idPost){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);

return this.http.get(this.baseUrl + "/checkposts/checkitems/"+idPost,{headers})
  .pipe(map(response => response.json()))
  .catch(this.handleError);
}
getSharedPosts(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);

return this.http.get(this.baseUrl + "/posts/shared",{headers})
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
getEditedCheckPost(idPost): Observable<CheckPost> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);

return this.http.get(this.baseUrl + "/checkposts/" + idPost,{headers})
  .pipe(map(response => response.json()))
  .catch(this.handleError);
}
deletePost(idPost) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
 console.log('Post was deleted from delete method');
return this.http.delete(this.baseUrl + "/posts/" + idPost,{headers}).pipe(map(res => true))
  .catch(this.handleError);
}
deleteCheckPost(idPost) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
 console.log('Post was deleted from delete method');
return this.http.delete(this.baseUrl + "/checkposts/" + idPost,{headers}).pipe(map(res => true))
  .catch(this.handleError);
}
deleteCheckItem(idItem) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
 console.log('Post was deleted from delete method');
return this.http.delete(this.baseUrl + "/checkposts/checklistitem/" + idItem,{headers}).pipe(map(res => true))
  .catch(this.handleError);
}
updatePost(id, title, body, color): Observable<boolean> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ id, title, body, color });
  return this.http.post(this.baseUrl + "/posts/update", bodyP, {headers}).pipe(map(res => true),
  catchError(this.handleError));
}
updateCheckPost(id, title, color): Observable<boolean> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ id, title, color });
  return this.http.post(this.baseUrl + "/checkposts/update", bodyP, {headers}).pipe(map(res => true),
  catchError(this.handleError));
}
updateCheckItem(id, checked, body,  CheckListPostId): Observable<boolean> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ id, checked, body,  CheckListPostId});
  return this.http.post(this.baseUrl + "/checkposts/checklistitem/update", bodyP, {headers}).pipe(map(res => true),
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
createCheckPost(title, color): Observable<number> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ title, color });
  return this.http.post(this.baseUrl + "/checkposts/create", bodyP, {headers}).pipe(map(response => response.json()),
  catchError(this.handleError));
}
createUserPost(UserId, PostId): Observable<boolean> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let bodyP = JSON.stringify({ UserId, PostId });
  return this.http.post(this.baseUrl + "/posts/shared/create", bodyP, {headers}).pipe(map(res => true),
  catchError(this.handleError));
}
createCheckItem( CheckListPostId,body): Observable<number> {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let authToken = localStorage.getItem('auth_token');
  headers.append('Authorization', `Bearer ${authToken}`);
  let checked = false;
  let bodyP = JSON.stringify({  CheckListPostId, body, checked });
  return this.http.post(this.baseUrl + "/checkposts/create/checklistitem", bodyP, {headers}).pipe(map(response => response.json()),
  catchError(this.handleError));
}
}