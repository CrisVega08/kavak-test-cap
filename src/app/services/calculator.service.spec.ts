import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

class FakeLoggerService {
  log() {}
}

const serviceMock = {
  log: jest.fn(),
};

const fakeObj = {
  log() {},
};

// Angular way
describe('CalculatorService Testbed', () => {
  let service: CalculatorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerService,
          useClass: FakeLoggerService,
        },
      ],
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    const result = service.add(4, 4);
    expect(result).toBe(8);
  });
});

describe('Calculator Service FakeloggerService', () => {
  const service = new CalculatorService(new FakeLoggerService());
  it('should add two numbers', () => {
    const result = service.add(4, 4);
    expect(result).toBe(8);
  });
});

describe('Calculator Service Spy service ', () => {
  const service = new CalculatorService(serviceMock);
  it('should add two numbers', () => {
    const result = service.add(4, 4);
    expect(result).toBe(8);
    expect(serviceMock.log).toHaveBeenCalled();
  });
});

describe('Calculator Service object ', () => {
  const service = new CalculatorService(fakeObj as LoggerService);
  it('should add two numbers', () => {
    const result = service.add(4, 4);
    expect(result).toBe(8);
  });
});
