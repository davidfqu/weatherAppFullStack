import { Component, OnInit } from '@angular/core';
import { ForecastService } from './services/forecast.service';
import { FavCitiesService } from './services/fav-cities.service';
import { MessageService } from './services/message.service';
import { Forecast } from './models/forecast.model';
import { FavCity } from './models/fav-city.model';
import { OnlyDaysPipe } from './pipes/only-days.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    OnlyDaysPipe
],
})
export class AppComponent implements OnInit {

  forecastData? : Forecast;
  favCities : FavCity[] = [];
  searchInput:string = '';
  currentCityIsFav:boolean = false;
  cardsPerCarouselItem :number = 3;
  carouselIndexes :number[] = [];

  constructor(private forecastService: ForecastService,
    private favCitiesService: FavCitiesService,
    private onlyDaysPipe: OnlyDaysPipe,
    private messageService: MessageService){}

  ngOnInit():void {
    this.getFavCities();
  }

  getFavCities():void{
    this.favCitiesService.getFavCities().subscribe(city => this.favCities = city);
  }

  addFavCity(name:string):void{
    name = name.trim();
    if (!name)
     return;
    this.favCitiesService.addFavCity({name} as FavCity)
    .subscribe(favcity=> {
      this.favCities.push(favcity);
    });
    this.currentCityIsFav = true;
  }

  deleteFavCity(cityName:string):void{
    console.log(cityName);
    this.favCitiesService.deleteFavCity((this.favCities.find(x=>x.name ==cityName) as FavCity).id)
    .subscribe( _ => {
      this.favCities = this.favCities.filter(x=> x.name != cityName);
    });
    this.currentCityIsFav = false;
  }

  onSubmit():void{
    this.searchInput = this.searchInput.trim()
    if(!this.searchInput)
    {
      this.messageService.add('Insert search value');
      return;
    }
    this.getForecast(this.searchInput);
  }

  getForecast(searchInput:string):void
  {
    this.forecastService.getForecast(searchInput,'metric')
      .subscribe( forecastData => {
        let  forecastLength : number = this.onlyDaysPipe.transform(forecastData.list).length;
        let slidesQty = Math.ceil(forecastLength/this.cardsPerCarouselItem);
        this.carouselIndexes = Array(slidesQty).fill(0).map((x,i)=>i)
        this.forecastData = forecastData;
        this.checkIfCityisFav(searchInput);
        this.searchInput = '';
      }
        );


  }

  checkIfCityisFav(cityName: string):void{
    if(this.favCities.map(x=>x.name).includes(cityName))
      this.currentCityIsFav = true;
    else
    this.currentCityIsFav = false;
  }

}
