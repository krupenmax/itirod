import { Injectable } from '@angular/core';
import { ThemeConfig } from '../types/theme';

@Injectable({
  	providedIn: 'root'
})
export class LayoutService {
	private themeConfig: ThemeConfig = {
		isNight: false
	};
	constructor() { }

	public setNightThemeConfig(value: boolean): void {
		this.themeConfig.isNight = value;
	}

	public getNightThemeConfig(): boolean {
		return this.themeConfig.isNight;
	}
}
