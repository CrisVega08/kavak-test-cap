import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CARS } from './data/data';
export class InMemCarsService implements InMemoryDbService {
  createDb() {
    return { cars: CARS };
  }
}
