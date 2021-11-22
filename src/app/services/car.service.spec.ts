import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CARS } from '../data/data';
import { CarService } from './car.service';
import { of } from 'rxjs';

describe('With mock function', () => {
  let service2: CarService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });

    service2 = TestBed.inject(CarService);
  });

  it('return all cars', (done) => {
    const spy = jest
      .spyOn(service2, 'findAllCars')
      .mockReturnValueOnce(of(CARS));
    service2.findAllCars().subscribe((cars) => {
      expect(cars).toEqual(CARS);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

describe('CarService with function setup', () => {
  function setup() {
    let service: CarService;
    let httpController: HttpTestingController;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });
    service = TestBed.inject(CarService);
    httpController = TestBed.inject(HttpTestingController);
    return { service, httpController };
  }

  it('create', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('return all cars', (done) => {
    const { service, httpController } = setup();
    service.findAllCars().subscribe((cars) => {
      expect(cars).toEqual(CARS);
      done();
    });
    const req = httpController.expectOne('api/cars');
    expect(req.request.method).toEqual('GET');
    req.flush(CARS);
    httpController.verify();
  });
});

describe('CarService Using HttpClientTestingModule', () => {
  let service: CarService;
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [],
    });

    service = TestBed.inject(CarService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('create', () => {
    expect(service).toBeTruthy();
  });

  it('return all cars', (done) => {
    service.findAllCars().subscribe((cars) => {
      expect(cars).toEqual(CARS);
      done();
    });
    const req = controller.expectOne('api/cars');
    expect(req.request.method).toEqual('GET');
    req.flush(CARS);
  });

  it('Should return car with specific Id', (done) => {
    const car = CARS[0];
    service.findCarById(car.id).subscribe((selectedCar) => {
      expect(selectedCar).toEqual(car);
      done();
    }, done.fail);
    const req = controller.expectOne(`api/cars/${car.id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(car);
  });

  it('should update car', (done) => {
    const car = CARS[0];
    car.info.name = 'Mazda';
    service.saveCar(car.id, car).subscribe((updatedCar) => {
      expect(updatedCar).toEqual(car);
      done();
    }, done.fail);
    const req = controller.expectOne(`api/cars/${car.id}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.info.name).toEqual(car.info.name);

    req.flush(car);
  });

  afterEach(() => {
    controller.verify();
  });
});
