import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }

  fetchPositions(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  addPositions(positionData: any){
    return this.http.post('https://jsonplaceholder.typicode.com/users',positionData);
  }
  deletePosition(id: number): Observable<any> {
    return this.http.delete('https://jsonplaceholder.typicode.com/users/' + id);
  }

  updatePosition(
    payload: any,id:number
  ){
    return this.http.put('https://jsonplaceholder.typicode.com/users/'+id, payload);
  }
}
