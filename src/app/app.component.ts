import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  Maps,
  Marker,
  Zoom,
  MapsModule,
  MapsComponent,
  NavigationLine,
} from '@syncfusion/ej2-angular-maps';
declare var google: any;

Maps.Inject(Marker, Zoom, NavigationLine);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('maps')
  public mapObj?: MapsComponent;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private directionsService: any;
  private source: string = '';
  private destination: string = '';

  public initMap() {
    this.directionsService = new google.maps.DirectionsService();
    const onButtonClick = () => {
      this.source = (
        document.getElementById('input') as HTMLInputElement
      ).value.toLowerCase();
      this.destination = (
        document.getElementById('output') as HTMLInputElement
      ).value.toLowerCase();
      if (
        this.source != null &&
        this.source != '' &&
        this.destination != null &&
        this.destination != ''
      ) {
        this.calculateAndDisplayRoute(this.directionsService);
      }
    };

    document.getElementById('route')?.addEventListener('click', onButtonClick);
  }

  calculateAndDisplayRoute(directionsService: any): void {
    this.directionsService.route(
      {
        origin: { query: this.source },
        destination: { query: this.destination },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK && this.mapObj != null) {
          this.mapObj.zoomSettings.shouldZoomInitially = true;
          var markers = this.mapObj.layersCollection[0].markerSettings;
          markers[0].dataSource = [];
          markers[0].dataSource.push({
            latitude: response.routes[0].legs[0].start_location.lat(),
            longitude: response.routes[0].legs[0].start_location.lng(),
          });
          markers[0].dataSource.push({
            latitude: response.routes[0].legs[0].end_location.lat(),
            longitude: response.routes[0].legs[0].end_location.lng(),
          });
          var navigationlines =
            this.mapObj.layersCollection[0].navigationLineSettings;
          var latLngs = response.routes[0].overview_path;
          var latitudes = [];
          var longitudes = [];
          for (var i = 0; i < latLngs.length; i++) {
            latitudes.push(latLngs[i].lat());
            longitudes.push(latLngs[i].lng());
          }
          navigationlines[0].latitude = latitudes;
          navigationlines[0].longitude = longitudes;
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  public zoomSettings: object = {
    enable: true,
  };
  public legendSettings: object = { visible: true };

  public layers: object[] = [
    {
      urlTemplate: 'https://tile.openstreetmap.org/level/tileX/tileY.png',
      markerSettings: [
        {
          visible: true,
          shape: 'Image',
          imageUrl:
            'https://ej2.syncfusion.com/angular/demos/assets/maps/images/ballon.png',
          width: 20,
          height: 20,
        },
      ],
      navigationLineSettings: [
        {
          visible: true,
          color: 'black',
          angle: 0,
          width: 2,
        },
      ],
    },
  ];
}
