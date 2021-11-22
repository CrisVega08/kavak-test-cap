// import { TestBed } from '@angular/core/testing';
// import { CalculatorService } from './calculator.service';
// import { LoggerService } from './logger.service';

// class FakeLoggerService {
//   log() {}
// }

// const serviceMock = {
//   log: jest.fn(),
// };

// const fakeObj = {
//   log() {},
// };

// // Angular way
// describe('CalculatorService Testbed', () => {
//   let service: CalculatorService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         {
//           provide: LoggerService,
//           useClass: FakeLoggerService,
//         },
//       ],
//     });
//     service = TestBed.inject(CalculatorService);
//   });

//   it('should add two numbers', () => {
//     const result = service.add(4, 4);
//     expect(result).toBe(8);
//   });
// });

// describe('Calculator Service FakeloggerService', () => {
//   const service = new CalculatorService(new FakeLoggerService());
//   it('should add two numbers', () => {
//     const result = service.add(4, 4);
//     expect(result).toBe(8);
//   });
// });

// describe('Calculator Service Spy service ', () => {
//   const service = new CalculatorService(serviceMock);
//   it('should add two numbers', () => {
//     const result = service.add(4, 4);
//     expect(result).toBe(8);
//     expect(serviceMock.log).toHaveBeenCalled();
//   });
// });

// describe('Calculator Service object ', () => {
//   const service = new CalculatorService(fakeObj as LoggerService);
//   it('should add two numbers', () => {
//     const result = service.add(4, 4);
//     expect(result).toBe(8);
//   });
// });

import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

class FakeService {
  log() {}
}

const serviceMock = {
  log: jest.fn(),
};

const fakeObj = {
  log() {},
};

// Angular way
describe('Angular way Calculator service', () => {
  it('should call addition function', () => {
    let service: CalculatorService;

    TestBed.configureTestingModule({
      providers: [LoggerService, CalculatorService],
    });
    service = TestBed.inject(CalculatorService);
    const result = service.add(2, 3);
    expect(result).toBe(2 + 3);
  });

  it('should subtract 2 numbers', () => {
    let service: CalculatorService;

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: fakeObj,
        },
      ],
    });
    service = TestBed.inject(CalculatorService);
    const result = service.subtract(2, 3);
    expect(result).toBe(2 - 3);
  });
});

//

describe('Calculator service', () => {
  it('should call addition function', () => {
    const service = new CalculatorService(fakeObj);
    const result = service.add(2, 3);
    expect(result).toBe(2 + 3);
  });
});
