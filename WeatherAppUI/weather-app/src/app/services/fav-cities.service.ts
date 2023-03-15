import { Injectable } from '@angular/core';
import { FavCity } from '../models/fav-city.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FavCitiesService {
  private favCitiesApiUrl = environment.favCitiesApiBaseUrl;

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  getFavCities() :Observable<FavCity[]>
  {
    return this.httpClient.get<FavCity[]>(this.favCitiesApiUrl)
    .pipe(tap(_ => console.log('fetched favorites cities')),
    catchError(this.handleError<FavCity[]>('getFavCities',[])));
  }

  addFavCity(favCity: FavCity):Observable<FavCity>
  {
    return this.httpClient.post<FavCity>(this.favCitiesApiUrl, favCity
      ).pipe(
        tap((newFavCity: FavCity) => console.log(`added favorite city w/ id=${newFavCity.id}`)),
    catchError(this.handleError<FavCity>('addFavCity')
      )
      );
  }

  deleteFavCity(id: number):Observable<FavCity>
  {
    console.log(id);
    return this.httpClient.delete<FavCity>(this.favCitiesApiUrl+'/'+id)
      .pipe(
        tap(_ => console.log(`deleted favorite city id=${id}`)),
    catchError(this.handleError<FavCity>('deleteFavCity'))
      );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.messageService.add(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
