import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsub)).subscribe((params) => {
      if (!params || params.name == null) {
        return;
      }
      this.detailsService.getForecastedData(params.name).subscribe((data) => {
        this.cityWeatherInfo = data;
      });
    });
  }
}
