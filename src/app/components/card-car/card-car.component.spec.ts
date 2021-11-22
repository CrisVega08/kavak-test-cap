// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardCarComponent } from './card-car.component';

// describe('CardCarComponent', () => {
//   let component: CardCarComponent;
//   let fixture: ComponentFixture<CardCarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CardCarComponent],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CardCarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { Car } from 'src/app/models/cars';
import { CardCarComponent } from './card-car.component';

describe('CardCarComponent', () => {
  it('should create component', () => {
    const component = new CardCarComponent();
    expect(component).toBeTruthy();
  });

  it('should render properties correctly', (done) => {
    const component = new CardCarComponent();
    expect(component.car).toBeUndefined();

    const car: Car = { id: 42, category: 'sport', info: { name: 'Chevrolet' } };
    component.car = car;
    component.selected.pipe(first()).subscribe((selectedCar: Car) => {
      expect(selectedCar).toBe(car);
      done();
    });

    component.click();
  });

  it('should render title', () => {
    TestBed.configureTestingModule({ declarations: [CardCarComponent] });
    const fixture = TestBed.createComponent(CardCarComponent);
    const component = fixture.componentInstance;
    const debugElement = fixture.debugElement;
    const car: Car = {
      id: 42,
      category: 'normal',
      info: { name: 'Chevrolet' },
    };
    component.car = car;
    fixture.detectChanges();
    const title = debugElement.nativeElement.querySelector('.card-title');
    expect(title.textContent).toBe(car.info.name);
  });
});
