import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/cars';

@Injectable({ providedIn: 'root' })
export class CarService {
  constructor(private http: HttpClient) {}

  findCarById(carId: number): Observable<Car> {
    return this.http.get<Car>(`api/cars/${carId}`);
  }

  findAllCars(): Observable<Car[]> {
    return this.http.get('api/cars') as Observable<Car[]>;
  }

  saveCar(carId: number, changes: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`api/cars/${carId}`, changes);
  }
}
