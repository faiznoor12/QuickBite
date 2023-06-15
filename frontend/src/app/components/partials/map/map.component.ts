import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletEvent,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from '../../../services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() order!: Order;
  @Input() reaOnly = false
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: '../../../../assets/pin.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [11.2587531, 75.78041];
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;
  constructor(private locationService: LocationService) {}
  ngOnChanges(): void {
    if(!this.order)return
    this.initializeMap();
    if(this.reaOnly && this.addressLatLng){
      this.showLocationOnReadOnlyMode()
    }
  }
  showLocationOnReadOnlyMode() {
   const m = this.map
   this.setMarker(this.addressLatLng)
   m.setView(this.addressLatLng,this.MARKER_ZOOM_LEVEL)


   m.dragging.disable()
   m.touchZoom.disable()
   m.doubleClickZoom.disable()
   m.scrollWheelZoom.disable()
   m.boxZoom.disable()
   m.keyboard.disable()
   m.off('click')
   m.tap?.disable()
   this.currentMarker.dragging?.disable()
  }
  initializeMap() {
    if (this.map) return;
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 13);
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click', (e: LeafletMouseEvent) => this.setMarker(e.latlng));
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  setMarker(latLng: LatLngExpression) {
    this.addressLatLng = latLng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latLng);
      return;
    }
    this.currentMarker = marker(latLng, {
      icon: this.MARKER_ICON,
      draggable: true,
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  set addressLatLng(latLng: LatLng) {
    if(!latLng.lat.toFixed) return
    latLng.lat = parseFloat(latLng.lat.toFixed(8));
    latLng.lng = parseFloat(latLng.lng.toFixed(8));
    this.order.addressLatLng = latLng;
    console.log(this.order.addressLatLng);
  }
  get addressLatLng(){
    return this.order.addressLatLng!
  }
}
