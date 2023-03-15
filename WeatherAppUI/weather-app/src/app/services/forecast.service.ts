import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Forecast } from '../models/forecast.model';
import { Observable, throwError,  } from 'rxjs';
import { catchError,  tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  constructor(private httpClient:HttpClient,private messageService: MessageService) { }
  private forcastApiUrl = environment.forecastApiBaseUrl;

  getForecast(searchInput:string, units?:string):Observable<Forecast>{
    let httpParams = new HttpParams()
    .set('appid', environment.weatherApiKey);

    //check if input only contains number
    if(/^\d+$/.test(searchInput))
    {
      httpParams = httpParams.append('zip',searchInput);
    }
    else
    {
      httpParams = httpParams.append('q',searchInput);
    }

    if(units)
    {
      httpParams = httpParams.append('units',units);
    }

    return this.httpClient.get<Forecast>(this.forcastApiUrl,{
      params: httpParams
    }).pipe(
      tap(_ => console.log(`fetched city forecast`)),
    catchError(
      (error:Response) => {
        if(error.status === 404)
        {
          console.log('city not found');

          this.messageService.add("City not found")
        }
        if(error.status === 500)
        {
          console.log('Internal error');
          this.messageService.add("Internal Error")
        }
        return throwError(()=>error);
      }
    )
    );
   }

}
