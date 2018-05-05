import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable()
export class GeolocationService {

  constructor() { }
  requestLocation(callback) {
    // W3C geo loaction API
    // navigator.geolocation.watchPosition - to watch the change in position
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);
      },
      error => {
        callback(null);
      }
    );
  }
  getMapLink(location: PlaceLocation) {
    // universal link
    // <a href="https://maps.google.com/?q=34.33,56.93">
    // <a href="https://maps.apple.com/?q=34.33,56.93">
    let query = '';
    if (location.latitude) {
      query = `${location.latitude}, ${location.longitude}`;
    } else {
      query = `${location.address}, ${location.city}`;
    }
    // check if the user is using Apple/Android using regex
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }
  }
}
