import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  cityList: Array<string> = [
    'London',
    'Paris',
    'Berlin',
    'Barcelona',
    'Lisbon',
  ];

  cityWeatherInfoList: Array<{ [key: string]: any }> = [];

  constructor(
    private changeDetectionSvc: ChangeDetectorRef,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    let obs$: Array<Observable<any>> = [];

    this.cityList.forEach((city) => {
      if (city == null) {
        return;
      }
      obs$.push(this.homeService.getWeatherData(city));
    });

    forkJoin(obs$)
      .pipe(take(1))
      .subscribe((data: any) => {
        if (!data) {
          return;
        }
        this.cityWeatherInfoList = data;
        this.changeDetectionSvc.detectChanges();
      });
  }
}
