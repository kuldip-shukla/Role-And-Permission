import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8000"

 httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private _http: HttpClient) { }
  
  register(userData){
    return this._http.post<any>(`${this.url}/registration`,userData)
    .pipe(catchError(this.errorHandler))
  }
  
  login(userData){
    return this._http.post<any>(`${this.url}/login`,userData)
    .pipe(
      catchError(this.errorHandler),
      map(result=>{
        return result;
      })
    )
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  displayData(){
    return this._http.post(`${this.url}/displayProfile`,{},this.httpOptions)
    .pipe(
      catchError(this.errorHandler),
      map(this.extractData)
    )
  }

  deleteData(id){
    return this._http.get(`${this.url}/deleteProfile/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  editData(id){
    return this._http.get(`${this.url}/edit/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateData(username,email,password,id){
    const obj = {
      username: username,
      email:email,
      password:password
    }
    return this._http.post<any>(`${this.url}/updateProfile/${id}`,obj)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
