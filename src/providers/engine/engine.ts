import { AppError } from './../../errors/app-error';
import { IResponse } from './../../models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotFound } from '../../errors/not-found-error';
import { BadRequestError } from '../../errors/bad-request-error';
import 'rxjs/add/operator/catch';

@Injectable()
export class EngineProvider {
  url = 'https://yts.am/api/v2/list_movies.json?sort_by=rating&query_term=';
  list = 'https://yts.am/api/v2/list_movies.json?limit=50&minimum_rating=6';
  details = 'https://yts.am/api/v2/movie_details.json?movie_id=';
  suggested = 'https://yts.am/api/v2/movie_suggestions.json?movie_id=';

  constructor(public http: HttpClient) {
    console.log('Hello EngineProvider Provider');
  }

  upcomingMovies() {
    return this.http.get<IResponse>(this.list).catch(this.catchError);
  }

  getMovie(title) {
    return this.http
      .get<IResponse>(`${this.url}/${title}`)
      .catch(this.catchError);
  }

  getSuggestedMovies(id) {
    return this.http
      .get<IResponse>(`${this.suggested}${id}`)
      .catch(this.catchError);
  }

  getDetails(id) {
    return this.http
      .get<IResponse>(`${this.details}${id}`)
      .catch(this.catchError);
  }

  catchError(e: Response) {
    if (e.status === 404) {
      return Observable.throw(new NotFound());
    } else if (e.status === 400) {
      return Observable.throw(new BadRequestError());
    } else {
      return Observable.throw(new AppError());
    }
  }
}
