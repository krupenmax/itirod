import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Activity } from '../types/activity';
import { MapViewComponent } from '../map-view/map-view.component';
import { User } from '../types/user';
import { UserService } from '../services/user.service';
import { LayoutService } from '../services/layout.service';
import { LogService } from '../services/log.service';


@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIconModule, MatSnackBarModule]
})
export class ActivityViewComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public activity: Activity,
		private userService: UserService,
		private componentRef: MatDialogRef<ActivityViewComponent>,
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private layoutService: LayoutService,
		private logService: LogService
	) {
  	}

	public subscribe(): void {
		this.activity.usersSubscribed?.push(this.userService.getUser() as User);
		this.logService.addLog(`Подписка на событие "${this.activity.description}" оформлена.`, this.userService.getUser()?.login);
		this.snackBar.open("Вы успешно подписались", "ОК", {
			verticalPosition: "bottom",
			horizontalPosition: "right",
			duration: 3000,
		});
		this.componentRef.close();
	}

	public getNightMode(): boolean {
		return this.layoutService.getNightThemeConfig();
	}

	public isSubscribed(): boolean {
		return this.activity.usersSubscribed.includes(this.userService.getUser() as User);
	}

	public unsubscribe(): void {
		this.snackBar.open("Отписка прошла успешно", "ОК", {
			verticalPosition: "bottom",
			horizontalPosition: "right",
			duration: 3000
		});
		this.logService.addLog(`Отписка на событие "${this.activity.description}" оформлена.`, this.userService.getUser()?.login);
		this.activity.usersSubscribed = this.activity.usersSubscribed.filter((user) => user !== this.userService.getUser());
		this.componentRef.close();
	}

	public viewMap(): void {
		this.dialog.open(MapViewComponent, {
			data: this.activity
		});
	}
}
