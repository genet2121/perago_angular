import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }

  fetchPositions(){
    return this.http.get('http://localhost:3000/positions');
  }
  fetchPositionById(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/positions/' + id);
  }
  addPositions(positionData: any){
    return this.http.post('http://localhost:3000/positions',positionData);
  }
  deletePosition(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/positions/' + id);
  }

  updatePosition(
    payload: any,id:number
  ){
    return this.http.put('http://localhost:3000/positions/'+id, payload);
  }
}
