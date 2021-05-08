import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<any> {
    const url: string = 'http://api.openweathermap.org/data/2.5/weather';
    const queryParams = {
      q: city,
      appid: '3d8b309701a13f65b660fa2c64cdc517',
      units: 'metric',
    };
    return this.http
      .get(url, { params: queryParams })
      .pipe(catchError((err) => of(null)));
  }
}
