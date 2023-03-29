import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Activity } from '../types/activity';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { ActivityService } from '../services/activity.service';
import { ActivityViewComponent } from '../activity-view/activity-view.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AccountComponent } from '../account/account.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SettingsComponent } from '../settings/settings.component';
import { MessagesComponent } from '../messages/messages.component';
import { UserService } from '../services/user.service';
import { LayoutService } from '../services/layout.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	providers: [ MatDatepickerModule, MatNativeDateModule ],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatButtonToggleModule,
		MatDialogModule,
		MatNativeDateModule,
		MatDatepickerModule,
		AccountComponent,
		MatPaginatorModule,
		SettingsComponent,
		MessagesComponent
	]
})
export class HomeComponent implements OnInit {
	public activities: Activity[] = [];
	public page = "home";
	public pageSize = 5;
	public pageIndex = 0;

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private activityService: ActivityService,
		private userService: UserService,
		private layoutService: LayoutService
	) {
		this.activities = this.activityService.getActivities();
	}

	public route(url: string): void {
		this.router.navigateByUrl(url);
	}

	public getNightMode(): boolean {
		return this.layoutService.getNightThemeConfig();
	}

	public addActivity(): void {
		this.dialog.open(AddActivityComponent, {
			autoFocus: false
		});
	}

	public viewActivity(activity: Activity): void {
		this.dialog.open(ActivityViewComponent, {
			data: activity,
			autoFocus: false,
			width: "500px",
		});
	}

	public changePage(e: any): void {
		this.page = e.value;
	}

	public getPageActivities(): Activity[] {
		return this.activities.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
	}

	public handlePage(e: any): void {
		this.pageIndex = e.pageIndex;
		this.pageSize = e.pageSize;
	}

	public exit(): void {
		this.userService.setUser(undefined);
		this.router.navigateByUrl("");
	}

	ngOnInit(): void {
	}

}
