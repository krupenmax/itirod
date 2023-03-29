import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from "@angular/router";
import { LayoutService } from './services/layout.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LogService } from './services/log.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
	imports: [ LoginComponent, RouterModule, CommonModule ]
})
export class AppComponent {
    title = 'Lab';
	constructor(private layoutService: LayoutService) {}

	public getNightTheme(): boolean {
		return this.layoutService.getNightThemeConfig();
	}
}
