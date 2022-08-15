import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // content component
  public idContent = new BehaviorSubject<number>(0);
  // post by category component
  public postByCategory = new BehaviorSubject<string>("");
  // author-post component
  public authorPost = new BehaviorSubject<string>("");

  constructor(private  http:HttpClient) {}
  getCategory(){
    return this.http.get<any>("http://localhost:3003/category")
    .pipe(map((res:any)=>res))
  }
  getPosts(){
    return this.http.get<any>("http://localhost:3003/posts")
    .pipe(map((res:any)=>res))
  }
  deleteCategory(id:string){
    return this.http.delete<any>("http://localhost:3003/category/"+id)
    .pipe(map((res:any)=>res))
  }
  deletePosts(id:string){
    return this.http.delete<any>("http://localhost:3003/posts/"+id)
    .pipe(map((res:any)=>res))
  }
}