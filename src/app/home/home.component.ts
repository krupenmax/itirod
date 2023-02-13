import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Activity } from './activity';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import { ActivityService } from '../activity.service';
import { ActivityViewComponent } from '../activity-view/activity-view.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
	]
})
export class HomeComponent implements OnInit {
	public activities: Activity[] = [];

	constructor(private router: Router, private dialog: MatDialog, private activityService: ActivityService) {
		this.activities = this.activityService.getActivities();
	}

	public route(url: string): void {
		this.router.navigateByUrl(url);
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

	ngOnInit(): void {
	}

}
