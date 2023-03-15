import { Component,Input } from '@angular/core';
import { List } from 'src/app/models/forecast.model';
import { ForecastHourlyComponent } from '../forecast-hourly/forecast-hourly.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-forecast-daily-card',
  templateUrl: './forecast-daily-card.component.html',
  styleUrls: ['./forecast-daily-card.component.scss']
})
export class ForecastDailyCardComponent {
  @Input() forecastItem?: List;
  @Input() forecastHourlyItems?: List[];
  @Input() date?:string;
  modalRef: MdbModalRef<ForecastHourlyComponent> | null = null;

  constructor(private modalService: MdbModalService){}

  openModal() {
    this.modalRef = this.modalService.open(ForecastHourlyComponent,{modalClass:"modal-dialog-centered modal-dialog-scrollable", data: {date:this.date , forecastHourly: this.forecastHourlyItems?.filter(f=>f.dt_txt.slice(0,10)== this.date?.slice(0,10))} })
  }
}
