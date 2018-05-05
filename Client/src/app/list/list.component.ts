import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/coffee';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  coffeeList: [Coffee];
  constructor(private data: DataService,
              private router: Router,
              private geolocation: GeolocationService) { }

  ngOnInit() {
    this.data.getList(list => {
      this.coffeeList = list;
    });
  }
  goToDetails(coffee: Coffee) {
    // remember navigate will take an array as input
    this.router.navigate(['/coffee', coffee._id]);
  }
  goToMap(coffee: Coffee) {
    // open the map URL
    const mapURL = this.geolocation.getMapLink(coffee.location);
    location.href = mapURL; // change the current url to map URL
  }
  /* jshint ignore:start*/
  share(coffee: Coffee) {
    const shareText = `I had this coffee in ${coffee.place} at ${coffee.location.address},${coffee.location.city}`;
    // check if the web share API is available
    if ('share' in navigator) {
      navigator['share']({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then(() => {
        console.log('shared');
      }).catch(() => {
        console.log('error in sharing');
      });
    } else {
      const shareURl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareURl;
    }
  }
}
