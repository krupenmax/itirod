import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountEditPopupComponent } from '../account-edit-popup/account-edit-popup.component';
import { LayoutService } from '../services/layout.service';
import { LogService } from '../services/log.service';
import { UserService } from '../services/user.service';
import { Log } from '../types/log';
import { User } from '../types/user';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../types/activity';
import { ActivityViewComponent } from '../activity-view/activity-view.component';


@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	standalone: true,
	imports: [
		MatButtonModule,
		MatButtonToggleModule,
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDialogModule,
		MatSnackBarModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
	public pageMode = "main";
	public user?: User;
	public form: FormGroup;
	public notifications: Log[] = [];
	public subscribtions: Activity[];
	public ownedActivities: Activity[];

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private dialog: MatDialog,
		private cdr: ChangeDetectorRef,
		private snackBar: MatSnackBar,
		private logService: LogService,
		private layoutService: LayoutService,
		private activityService: ActivityService
		) {
		this.user = this.userService.getUser();
		this.form = this.fb.group({
			name: this.fb.control<string>(this.user?.firstName as string),
			secondName: this.fb.control<string>(this.user?.lastName as string),
			nickname: this.fb.control<string>(this.user?.login as string),
			email: this.fb.control<string>(this.user?.email as string)
		});
		this.notifications = this.logService.getLogs();
		this.subscribtions = this.activityService.getUserSubscriptions(this.user as User);
		this.ownedActivities = this.activityService.getOwnedActivities(this.user as User);
	}

	public getNightMode(): boolean {
		return this.layoutService.getNightThemeConfig();
	}

	public handle(e: any): void {
		if (this.pageMode === "notifications") {
			this.logService.markAllAsChecked();
		}
		this.pageMode = e.value;
	}

	public viewActivity(activity: Activity): void {
		const dialogRef = this.dialog.open(ActivityViewComponent, {
			data: activity,
			autoFocus: false,
			width: "500px",
		});

		dialogRef.afterClosed().subscribe(() => {
			this.subscribtions = this.activityService.getUserSubscriptions(this.user as User);
			this.cdr.detectChanges();
		})
	}

	public edit(): void {
		const dialogRef = this.dialog.open(AccountEditPopupComponent, {
			autoFocus: false,
			data: this.form,
		});

		dialogRef.afterClosed().subscribe((form) => {
			if (form) {
				const newUser = {
					login: form.get("nickname")?.value,
					password: this.user?.password as string,
					firstName: form.get("name")?.value,
					lastName: form.get("secondName")?.value,
					email: form.get("email")?.value,
					username: form.get("nickname")?.value
				};

				this.userService.editUser(this.user as User, newUser);
				this.user = this.userService.getUser();
				this.form.patchValue({
					name: this.user?.firstName,
					secondName: this.user?.lastName,
					nickname: this.user?.login,
					email: this.user?.email
				});
				this.snackBar.open("Профиль успешно изменен.", "Ок", {
					duration: 3000
				});
				this.logService.addLog("Профиль был отредактирован.", this.user?.login);
				console.log(this.logService.getLogs());
				this.cdr.detectChanges();
			}
		})
	}

	public handleNotificationCheck(notification: Log): void {
		this.logService.markAsChecked(notification);
		this.notifications = this.logService.getLogs();
		this.cdr.detectChanges();
	}
}
