import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Turn } from '../models/turn';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAllTurns(): Observable<any> {
    return this.http.get(environment.endpointGetAllTurns).pipe(
      catchError(this.handleError)
    );
  }

  saveTurn(turn: any): Observable<any> {
    return this.http.post<any>(environment.endpointSaveTurn, turn).pipe(
      catchError(this.handleError)
    );
  }

  
}
