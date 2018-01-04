import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const heroesUrl = `/api/heroes`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'applcation/json' })
};

@Injectable()
export class HeroService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(heroesUrl)
      .pipe(
      tap(() => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.httpClient.get<Hero>(`${heroesUrl}/${id}`)
      .pipe(
      tap(() => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  addHero(newHero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(heroesUrl, newHero, httpOptions)
      .pipe(
      tap((hero: Hero) => this.log(`added hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.put<Hero>(heroesUrl, hero, httpOptions)
      .pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    return this.httpClient.delete<Hero>(`${heroesUrl}/${id}`, httpOptions)
      .pipe(
      tap(() => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero id=${id}`))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.httpClient.get<Hero[]>(`${heroesUrl}/?name=${term}`)
      .pipe(
      tap(() => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
