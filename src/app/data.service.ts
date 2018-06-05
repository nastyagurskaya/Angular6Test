import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getUser(UsId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+UsId)
  }
  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }
  getPostsByUsId(UsId) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId='+UsId)
  }
}
