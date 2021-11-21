import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Car } from '../models/cars';
import { Observable } from 'rxjs';
import { CarService } from './car.service';

@Injectable({ providedIn: 'root' })
export class CarResolver implements Resolve<Car> {
  constructor(private carService: CarService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Car> {
    return this.carService.findCarById(route.params['id']);
  }
}
