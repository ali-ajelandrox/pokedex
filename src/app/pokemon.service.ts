// pokemon.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getAllPokemon(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}pokemon?limit=1025`).pipe(
      map((response: any) => response.results),
      catchError(this.handleError)
    );
  }

  getPokemon(nameOrId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}pokemon/${nameOrId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('Error fetching data from API');
  }
}
