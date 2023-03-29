import { Component } from '@angular/core';
import * as Leaflet from "leaflet";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Activity } from '../types/activity';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  imports: [ LeafletModule, MatButtonModule, MatDialogModule ],
  standalone: true
})
export class MapViewComponent {
	public map?: Leaflet.Map;
	public marker?: Leaflet.Marker;

	constructor(@Inject(MAT_DIALOG_DATA) public activity: Activity) {
	}

	public initMap(): void {
		const icon = Leaflet.icon({
			iconSize: [45, 63],
			iconUrl: "../assets/images/Doggy.png",
		});
		this.marker = Leaflet.marker([this.activity.placeUrl.lat, this.activity.placeUrl.lng], {icon: icon});
		this.map = Leaflet.map("map", {
		 	center: [this.activity.placeUrl.lat, this.activity.placeUrl.lng],
		  	zoom: 12,
		});

		const tiles = Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		  	attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap<a/>",
		  	maxZoom: 18,
		});
		tiles.addTo(this.map);
		this.marker.addTo(this.map as Leaflet.Map);
	}

	public ngOnInit(): void {
		this.initMap();
	}
}
