import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/cars';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly emptyCar = {
    info: { name: '' },
    category: '',
    id: 0,
  };

  cars: Car[] = [];
  currentCar: Car = this.emptyCar;
  categories: string[] = [];
  carByCategories: { [key: string]: any } = {};
  currentTab!: string;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.reloadCars();
  }

  reloadCars() {
    this.carService.findAllCars().subscribe((response: Car[]) => {
      this.cars = response;
      this.getCategories();
    });
  }

  getCategories() {
    this.cars.forEach((car) => {
      if (!this.categories.includes(car?.category)) {
        this.categories.push(car?.category);
      }
    });
    this.currentTab = this.categories[0];
    this.sortCarsByCategory();
  }

  sortCarsByCategory() {
    this.carByCategories = this.categories.reduce(
      (categories: { [key: string]: any }, category: string) => {
        categories[category] = this.filterByCategory(category);
        return categories;
      },
      {}
    );
  }

  filterByCategory(category: string): Car[] {
    return this.cars
      .filter((car) => car.category === category)
      .sort((c1: Car, c2: Car) => c1?.id - c2?.id);
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  showDetails(car: Car) {
    this.currentCar = car;
  }
}
