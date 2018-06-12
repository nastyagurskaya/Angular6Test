import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('https://localhost:44330/api/users')
  }
  getUser(UsId) {
    return this.http.get('https://localhost:44330/api/users/'+UsId)
  }
  getPosts() {
    return this.http.get('https://localhost:44330/api/posts')
  }
  getPostsByUsId(UsId) {
    return this.http.get('https://localhost:44330/api/users/'+UsId+'/posts')
  }
}
