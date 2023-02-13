import { Component } from '@angular/core';
import * as Leaflet from "leaflet";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	standalone: true,
	imports: [ LeafletModule, MatButtonModule, MatDialogModule ]
})
export class MapComponent implements OnInit {
	public map?: Leaflet.Map;
	public marker?: Leaflet.Marker;

	constructor(private componentRef: MatDialogRef<MapComponent>) {
	}

	public initMap(): void {
		this.map = Leaflet.map("map", {
		 	center: [ 53.9, 27.5667],
		  	zoom: 12,
		});

		const tiles = Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		  	attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap<a/>",
		  	maxZoom: 18,
		});
		tiles.addTo(this.map);
		this.map.on("click", (e: any) => this.addMarker(e));
	}

	public ngOnInit(): void {
		this.initMap();
	}

	public addMarker(e: any): void {
		if (this.marker) {
			this.marker.removeFrom(this.map as Leaflet.Map);
		}
		const icon = Leaflet.icon({
			iconSize: [45, 63],
			iconUrl: "../assets/images/Doggy.png",
		  });
		this.marker = Leaflet.marker(e.latlng, {icon: icon});
		this.marker.addTo(this.map as Leaflet.Map);
	}

	public close(): void {
		this.componentRef.close(this.marker?.getLatLng());
	}
}
