import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Activity } from '../home/activity';
import { User } from '../user';
import { UserService } from '../user.service';


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
		private snackBar: MatSnackBar) {
  	}

	public subscribe(): void {
		this.activity.usersSubscribed?.push(this.userService.getUser() as User);
		this.snackBar.open("Вы успешно подписались", "ОК");
		this.componentRef.close();
	}

	public isSubscribed(): boolean {
		return this.activity.usersSubscribed.includes(this.userService.getUser() as User);
	}

	public unsubscribe(): void {
		this.snackBar.open("Отписка прошла успешно", "ОК");
		this.activity.usersSubscribed = this.activity.usersSubscribed.filter((user) => user !== this.userService.getUser());
		this.componentRef.close();
	}
}
