import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RootObject } from '../RootObject';
import { Result } from '../Result';

const API_KEY: string = '?api_key=e177911df904ad27eb9098b8168a587d';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private movieTopRatedApiUrl =
    'https://api.themoviedb.org/3/movie/top_rated' + API_KEY;
  private seriesTopRatedApiUrl =
    'https://api.themoviedb.org/3/tv/top_rated' + API_KEY;
  private movieSearchApiUrl =
    'https://api.themoviedb.org/3/search/movie' + API_KEY;
  private seriesSearchApiUrl =
    'https://api.themoviedb.org/3/search/tv' + API_KEY;
  private movieByIdApiUrl = 'https://api.themoviedb.org/3';
  private seriesByIdApiUrl = 'https://api.themoviedb.org/3/tv/';

  activeCategory!: 'movie' | 'tv' | '';
  private activeSearchTerm: string = '';
  results$: Subject<any> = new Subject();
  loader$: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  private getTopRatedMovies(): Observable<RootObject> {
    return this.http.get<RootObject>(this.movieTopRatedApiUrl).pipe(
      map((data: any) => {
        data.results.map((item: any) => {
          item.category = 'movie';
          return item;
        });
        return data;
      })
    );
  }
  private getTopRatedSeries(): Observable<RootObject> {
    return this.http.get<RootObject>(this.seriesTopRatedApiUrl).pipe(
      map((data: any) => {
        data.results.map((item: any) => {
          item.title = item.name;
          item.category = 'tv';
          return item;
        });
        return data;
      })
    );
  }

  private getMovieSearchResults(searchTerm: string): Observable<RootObject> {
    return this.http
      .get<RootObject>(this.movieSearchApiUrl + '&query=' + searchTerm)
      .pipe(
        map((data: any) => {
          data.results.map((item: any) => {
            item.category = 'tv';
            return item;
          });
          return data;
        })
      );
  }
  private getSerieSearchResults(searchTerm: string): Observable<RootObject> {
    return this.http
      .get<RootObject>(this.seriesSearchApiUrl + '&query=' + searchTerm)
      .pipe(
        map((data: any) => {
          data.results.map((item: any) => {
            item.title = item.name;
            item.category = 'tv';
            return item;
          });
          return data;
        })
      );
  }

  private getMovieById(id: string): Observable<Result> {
    return this.http.get<Result>(this.movieByIdApiUrl + id + API_KEY);
  }
  private getSerieById(url: string): Observable<Result> {
    return this.http.get<Result>(this.movieByIdApiUrl + url + API_KEY).pipe(
      map((data: any) => {
        if (data.name != null) {
          data.title = data.name;
        }
        return data;
      })
    );
  }

  setCategory(category) {
    this.activeCategory = category;
    this.getResults(this.activeCategory, this.activeSearchTerm);
  }

  setSearchTerm(searchTerm) {
    this.activeSearchTerm = searchTerm;
    if (searchTerm.length >= 3 || searchTerm.length == 0) {
      this.getResults(this.activeCategory, this.activeSearchTerm);
    }
  }

  getResults(
    category: 'movie' | 'tv' | '',
    searchTerm: string = '',
    url: string = ''
  ) {
    let fetchData$: Observable<any> = of([]);
    var isLoading$: Observable<boolean> = of(true);
    isLoading$.subscribe((data) => {
      this.loader$.next(data);
    });
    if (category === 'movie' && !searchTerm.length && !url) {
      fetchData$ = this.getTopRatedMovies();
    } else if (category === 'tv' && !searchTerm.length && !url) {
      fetchData$ = this.getTopRatedSeries();
    } else if (category === 'movie' && searchTerm.length) {
      fetchData$ = this.getMovieSearchResults(searchTerm);
    } else if (category === 'tv' && searchTerm.length) {
      fetchData$ = this.getSerieSearchResults(searchTerm);
    }
    if (url) {
      fetchData$ = this.getSerieById(url);
    }
    fetchData$.subscribe((data) => {
      this.results$.next(data);
      isLoading$ = of(false);
      isLoading$.subscribe((data) => {
        this.loader$.next(data);
      });
    });
  }
}
