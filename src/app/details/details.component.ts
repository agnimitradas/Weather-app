import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DetailsService],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  private unsub: Subject<any> = new Subject<any>();
  cityWeatherInfo: { [key: string]: any } = {};
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.getCityName()
      .pipe(
        takeUntil(this.unsub),
        switchMap((name) => {
          if (name == null) {
            return of(null);
          }
          this.loading = true;
          return this.detailsService.getForecastedData(name);
        })
      )
      .subscribe(
        (data) => {
          this.loading = false;
          this.cityWeatherInfo = data;
        },
        (err) => {
          this.loading = false;
        }
      );
  }

  getCityName(): Observable<any> {
    return this.route.params.pipe(
      map((params) => {
        return params && params.name;
      })
    );
  }
}
