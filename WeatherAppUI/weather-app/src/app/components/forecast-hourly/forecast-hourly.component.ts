import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { List } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-forecast-hourly',
  templateUrl: './forecast-hourly.component.html',
  styleUrls: ['./forecast-hourly.component.scss']
})
export class ForecastHourlyComponent {
  forecastHourly : List[] | null = null;
  date: string | null = null;
  constructor(public modalRef: MdbModalRef<ForecastHourlyComponent>) {}
}
