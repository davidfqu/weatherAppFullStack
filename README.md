# Weather App

Web Application developed in Angular for the front and NET on the back end. This application allows to consult the 5-day forecast of any city by name
or by USA zip code and check the weather for periods of 3 hours. Any searched city can be added or removed from a list of favorite cities which will remain saved.

[Try Weather App!](https://weatherappdqu.azurewebsites.net/)

### Usage

1. Type any city name in the search bar and do enter in order to search the forecast. (You can also enter a city zip code but this functionality only works for USA cities.
2. The application will display the 5 days forecast.
3. Click on the 'MORE' button of any day in order to see the 3 hours span forecast.
4. Click on the star button at the right of the city name in order to add or delete the current city from your favorite cities list.
5. Click to any of your favorite city in order to display the forecast.

## Front End

The application consumes 2 apis.
The first one is from OpenWeather.org which makes calls to consult the forecast information.
The 2nd  api is favCitiesApi which is in charge of storing and managing the list of favorite cities

[Open Weather 5  days forcast api](https://openweathermap.org/forecast5)

[FavCities api](https://favctitiesapi20230312130103.azurewebsites.net/swagger/index.html)

### Technologies

- NodeJS 18.15
- Angular 15.2
- Mdb Angular 4.0

### Instructions to run

1. From the project folder install dependencies running from the terminal the next command

```bash
npm install
```

2. Run the following command 
```bash
ng serve-o
```

## Back End

The favCities api is responsible for persisting the list of favorite cities. It adds, reads and remove items from the favorite city list stored in a SQL database.

[FavCities api](https://favctitiesapi20230312130103.azurewebsites.net/swagger/index.html)

### Technologies

- NET 6.0
- SQL Server
- Entity FrameworkCore 7.0.3

### Instructions to run

Make sure to have installed SQL Server and install/update the next needed packages.

- Microsoft.EntityFrameworkCore.SqlServer (7.0.3)
- Microsoft.EntityFrameworkCore.Tools (7.0.3)
- Swashbuckle.AspNetCore (6.2.3)

1. Build the project.
2. Migrate database to your localhost database by running the following command on the package manager console.

```bash
add-migration initial
```
3. Once the migration is ready, apply the changes to your localdb by running the next command on the package manager console.

```bash
update-database
```
4. Verify the the database was successfully created.
5. Run the project.
6. Enter to the swagger page by appending 'swagger/index.html' to the url. Example: https://localhost:7274/swagger/index.html.

## Contributing
Web App developed by David Quiñonez for any doubts please contact me through the email 
davidfqu@gmail.com