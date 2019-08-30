//import core angular functions needed by this component
import { Component, OnInit } from '@angular/core';
//import the data structure and type definitiion - added here to aid binding
import { locationClassDefinition } from '../selectlocation';
//import the service export
import { GetlocationsService } from '../getlocations.service';

//attempt at includng a leaflet module and parts
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer, circle, Map, } from 'leaflet';
declare let L;

//import { reduce } from 'rxjs/operators';

//define this components parts
@Component({
  selector: 'app-selectlocation',
  templateUrl: './selectlocation.component.html',
  styleUrls: ['./selectlocation.component.css'],
})

//export oninitialisation the following
export class SelectlocationComponent implements OnInit {
  //defines the data structure and type definitiion of variable userlocations
  userlocations: locationClassDefinition[];
  //define other variables with type
  locationMessage : string;
  Lat : number;
  Lon : number;
  options;
  layersControl;
  layers;
  marker;
  clickedCoords;
  browserCoords;
  

  constructor(
    //constructs a private instance of the service for use in this component only
    private PrivateInstanceOfService: GetlocationsService
  ) {}

  //calls methods from this component 
  ngOnInit() {
    this.LoadLocations();
    //statically loaded leaflet instance
    const map = L.map('staticmap').setView([ 5.3, 6.4 ], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    this.setupMap();

  }
 
  //registering a mapready event
  onMapReady(map: Map) : void {
    // Onclick set the location variables
    map.on('click', <LeafletMouseEvent>(event) => {
      console.log(event.latlng);
      //this.clickedCoords = map.mouseEventToLatLng(event);
      this.clickedCoords = event.latlng;
      this.Lat = this.clickedCoords.lat;
      this.Lon = this.clickedCoords.lng;
      this.clickedCoords = 'LatLng {lat:' + this.Lat + ',lng:' + this.Lon + '}';
      this.layers = [
        circle([ this.Lat, this.Lon ], { radius: 10000 , color: 'red'})
      ];
    });
  }

  //setupmap
  setupMap() : void { 

  //create map options
  this.options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 7,
    center: latLng([ 5.3, 6.4 ])
  }

  //add extra map features
  this.layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      //'Big Circle': circle([ 5.3, 6.4 ], { radius: 10000 })
    }
    }
 
  }

  //internal component function to assign the data made available from the private service instance to this.userlocations
  LoadLocations(): void {
    //invoke the constructor
    this.PrivateInstanceOfService.LoadLocationOptions()
      //subscribe to the Observable and apply it to userlocations variable
      .subscribe(userlocations => this.userlocations = userlocations) 
  }

  //add a new item to the list
  add(state: string): void {
    state = state.trim();
    if (!state) { return; }
    this.PrivateInstanceOfService.addItem({ state } as locationClassDefinition)
      .subscribe(userlocations => {
        this.userlocations.push(userlocations);
      });
  }

  //get location from the browser - likely needs moving to a seperate service
  getBrowserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.Lat = position.coords.latitude;
        this.Lon = position.coords.longitude;
        this.browserCoords = 'LatLng {lat:' + position.coords.latitude + ',lng:' + position.coords.longitude + '}';
        //this.updatemessage("Browser geoloction returned coordinates");
      });
    } else { 
      this.updatemessage("Browser geolocation is not supported"); 
    }
  }

  //function to delete an item
  delete(userlocations: locationClassDefinition): void {
    this.userlocations = this.userlocations.filter(h => h !== userlocations);
    this.PrivateInstanceOfService.deleteItem(userlocations).subscribe();
  }

  //function to update message
  updatemessage(locationMessage : string): void {
    this.locationMessage = locationMessage;
  }
  

}

