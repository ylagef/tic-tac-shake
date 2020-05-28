import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from '../models/game.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Box } from '../models/box.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUri: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUri = 'http://' + window.location.host.split(':')[0] + ':3000/api';
  }

  public nextMove(game: Game, box: Box): Observable<any> {
    const data = { game, box };

    const url = `${this.baseUri}/next-move`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Error handling
  private errorMgmt(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
