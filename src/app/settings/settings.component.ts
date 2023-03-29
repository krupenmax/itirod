import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [ MatSlideToggleModule, ReactiveFormsModule, CommonModule ]
})
export class SettingsComponent {
	public form: FormGroup;
	constructor(
		private layoutService: LayoutService,
		private fb: FormBuilder) {
		this.form = this.fb.group({
			isNightMode: this.fb.control<boolean>(this.layoutService.getNightThemeConfig())
		});
	}

	public handleNightMode(e: any): void {
		console.log(e);
		this.layoutService.setNightThemeConfig(e);
	}

	public getNightMode(): boolean {
		return this.layoutService.getNightThemeConfig();
	}
}
