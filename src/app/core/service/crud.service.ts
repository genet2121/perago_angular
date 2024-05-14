import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private api_url = environment.api_url;

  constructor(private http: HttpClient) { }

  fetchPositions() {
    return this.http.get(`${this.api_url}/positions`);
  }

  fetchPositionById(id: number): Observable<any> {
    return this.http.get(`${this.api_url}/positions/${id}`);
  }

  addPositions(positionData: any) {
    return this.http.post(`${this.api_url}/positions`, positionData);
  }

  deletePosition(id: number): Observable<any> {
    return this.http.delete(`${this.api_url}/positions/${id}`);
  }

  updatePosition(payload: any, id: number) {
    return this.http.put(`${this.api_url}/positions/${id}`, payload);
  }
}
