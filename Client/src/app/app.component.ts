import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private ngswUpdate: SwUpdate, private ngswPush: SwPush) {}
  updateNetworkStatusUI() {
    if (navigator.onLine) {
      (document.querySelector('body') as any).style = '';
    } else {
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }
  subscribeToPush() {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        console.log('subscribed to push notifications');
        this.ngswPush.requestSubscription({serverPublicKey: 'replace-with-the-public-key'})
        .then((registration: PushSubscription) => {
          console.log(registration);
          // TODO send that object to the server
        });
      }
    });
  }
  ngOnInit() {

    // Checking for SW update status
    this.ngswUpdate.available.subscribe(update => {
      console.log('current version is', update.current);
      console.log('available version is', update.available);
      console.log('type of update is', update.type);
      if (update.type as any === 'UPDATE_AVAILABLE') {
        const sb = this.snackBar.open('There is an update available', 'Install Now', {duration: 4000});
        sb.onAction().subscribe(() => {
          this.ngswUpdate.activateUpdate().then(() => {
            document.location.reload();
          });
        });
      }
    });
    this.ngswUpdate.checkForUpdate();

    // Checking network status
    // handling the network being offline or online
    // call the updateNetworkStatusUI() method when the network changes from online to offline or vice-versa
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    // Cheking installation status
    if ((navigator as any).standlone === false) {
      // this is on an ios device and we are in the browser, not in PWA
      this.snackBar.open('You can add this PWA to Home Screen', '', { duration: 3000 });
    } else {
      // Its not IOS
      if (window.matchMedia('display-mode: browser').matches) {
        // we are in the browser
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault(); // abort the web app banner
          const sb = this.snackBar.open('Do you want to install this App?', 'Install', { duration: 5000 });
          // observable
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then( result => {
              if (result.outcome === 'dismissed') {
                // TODO - track no installation
              } else {
                // TODO it was installed
              }
            });
          });
          return false;
        });
      }
    }
  }
}
