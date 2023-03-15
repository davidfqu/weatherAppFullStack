import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/forecast.model';

@Pipe({
  name: 'onlyDays'
})
export class OnlyDaysPipe implements PipeTransform {

  transform(value: List[], sliceStart:number= 0, sliceEnd : number = 0): List[] {
    let newArray: List[] = []

    let currentMinTemp = value[0].main.temp_min;
    let currentMaxTemp =value[0].main.temp_max;
    let startDay = value[0].dt_txt.slice(0,10);

    let minTemp = currentMinTemp;
    let maxTemp = currentMinTemp;
    let currentDay = startDay;


    value.forEach((item, index)=>{

      if(item.dt_txt.slice(-8) == '21:00:00')
      {
        push();

      }
      else
      {
        compare();
      }

      function compare(){
        if(item.main.temp_min< currentMinTemp)
        currentMinTemp = item.main.temp_min

        if(item.main.temp_max > currentMaxTemp)
        currentMaxTemp = item.main.temp_max
      }

      function push(){
        minTemp = currentMinTemp;
        maxTemp = currentMaxTemp;

        currentMinTemp = item.main.temp_min;
        currentMaxTemp = item.main.temp_max;

        item.main.temp_min = minTemp;
        item.main.temp_max = maxTemp;

        newArray.push(item);
      }
      currentDay = item.dt_txt.slice(0,10);
    });

    if(sliceEnd>0)
    {

      return newArray.slice(sliceStart,sliceEnd);

    }

    return newArray;
  }

}
