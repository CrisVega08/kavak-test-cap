import { Component, EventEmitter, Input, Output } from '@angular/core';
import { empty } from 'rxjs';
import { Car } from 'src/app/models/cars';

@Component({
  selector: 'app-details-car',
  templateUrl: './details-car.component.html',
  styleUrls: ['./details-car.component.scss'],
})
export class DetailsCarComponent {
  bkpCar!: Car;
  showInfo = false;
  secondClick = false;

  @Input() set car(values: Car) {
    this.bkpCar = JSON.parse(JSON.stringify(values));
    if (values && !!values.info.name) {
      this.showInfo = true;
    }
  }

  @Output() clearCar = new EventEmitter<void>();

  close() {
    if (!this.secondClick) {
      this.secondClick = true;
    } else if (this.secondClick) {
      this.showInfo = false;
      this.bkpCar.info.name = '';
      this.secondClick = false;
      this.clearCar.emit();
    }
  }
}
