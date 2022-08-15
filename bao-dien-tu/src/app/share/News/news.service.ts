import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiURL = 'http://localhost:3003'
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getTin() {
    return this.http.get(this.apiURL + '/article')
  }
  getChuyenmuc() {
    return this.http.get(this.apiURL + '/category')
  }
  getChuyenmucById(id: any) {
    return this.http.get(this.apiURL + '/category/' + id)
      .pipe(retry(1), catchError(this.handleError));

  }
  updateChuyenmuc(id: any, chuyenmuc: any) {
    return this.http.put(
      this.apiURL + '/category/' + id,
      chuyenmuc
    )
      .pipe(retry(1), catchError(this.handleError));

  }
  createChuyenmuc(chuyenmuc:any){
    return this.http.post<any>(this.apiURL+'/category',chuyenmuc)
  }

  deleteCategory(id:number){
    return this.http.delete<any>(this.apiURL+"/category/"+id)
    
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
