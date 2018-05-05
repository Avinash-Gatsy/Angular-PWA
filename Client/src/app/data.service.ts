import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';
import { Coffee } from './logic/coffee';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }
  public endpoint = 'http://localhost:3000';
  // public endpoint = 'http://db19fbf8.ngrok.io';

  getCoffee(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`).subscribe(response => {
      callback(response.json());
    });
  }
  getList(callback) {
    // const List = [
    //   new Coffee('Double Expresso', 'Starbucks', new PlaceLocation('Express Avenue', 'Chennai')),
    //   new Coffee('Caramel Americano', 'CCD', new PlaceLocation('Phoneix Market City', 'Chennai'))
    // ];
    // callback(List);
    this.http.get(`${this.endpoint}/coffees`).subscribe(response => {
      callback(response.json());
    });
  }
  save(coffee, callback) {
    if (coffee._id) {
      // its an update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee).subscribe(response => {
          callback(true);
      });
    } else {
      // its an insert
      this.http.post(`${this.endpoint}/coffees`, coffee).subscribe(response => {
          callback(true);
      });
    }
  }
}
