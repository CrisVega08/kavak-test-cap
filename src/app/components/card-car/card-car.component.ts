import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from 'src/app/models/cars';

@Component({
  selector: 'app-card-car',
  templateUrl: './card-car.component.html',
  styleUrls: ['./card-car.component.scss'],
})
export class CardCarComponent {
  @Input() car!: Car;
  @Output() selected = new EventEmitter<Car>();

  click() {
    this.selected.emit(this.car);
  }
}
