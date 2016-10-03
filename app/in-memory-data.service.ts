import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'mr. nice'},
      {id: 12, name: 'narco'},
      {id: 13, name: 'bombasto'},
      {id: 14, name: 'celeritas'},
      {id: 15, name: 'magneta'},
      {id: 16, name: 'rubberman'},
      {id: 17, name: 'dynama'},
      {id: 18, name: 'dr iq'},
      {id: 19, name: 'magma'},
      {id: 20, name: 'tornado'}
    ];
    return {heroes};
  }
}
