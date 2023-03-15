import { TestBed } from '@angular/core/testing';

import { FavCitiesService } from './fav-cities.service';

describe('FavCitiesService', () => {
  let service: FavCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
