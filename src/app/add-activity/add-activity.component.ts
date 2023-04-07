import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from '../services/activity.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../types/user';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MapComponent } from '../map/map.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Activity } from '../types/activity';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-add-activity',
	templateUrl: './add-activity.component.html',
	styleUrls: ['./add-activity.component.scss'],
	standalone: true,
	imports: [
		MatCheckboxModule,
		MatButtonModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatInputModule,
		MatIconModule,
		CommonModule,
		MatSnackBarModule
	]
})
export class AddActivityComponent {
	public form: FormGroup;
  	constructor(
		private fb: FormBuilder,
		private activityService: ActivityService,
		private componentRef: MatDialogRef<AddActivityComponent>,
		private userService: UserService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private datepipe: DatePipe
	) {
		this.form = this.fb.group({
			category: this.fb.control<string>("", Validators.required),
			description: this.fb.control<string>("", Validators.required),
			place: this.fb.control<string>("", Validators.required),
			placeUrl: this.fb.control<string>(""),
			isAnonymous: false
		});
	}

	public addActivity(): void {
		if (this.form.valid) {
			const activity: Activity = {
				category: this.form.get("category")?.value,
				description: this.form.get("description")?.value,
				place: this.form.get("place")?.value,
				rate: 0,
				usersSubscribed: [],
				imageName: "",
				date: this.datepipe.transform((new Date), "MM/dd/yyyy")?.toString() as string,
				placeUrl: this.form.get("placeUrl")?.value,
				userOwner: this.userService.getUser() as User,
				time: this.datepipe.transform((new Date), "h:mm:ss")?.toString() as string
			};
			if (this.form.value.isAnonymous) {
				activity.userOwner = undefined;
			}
			this.activityService.addActivity(activity);
			this.snackBar.open("Событие успешно добавлено", "ОК", {
				verticalPosition: "bottom",
				horizontalPosition: "right"
			});
			this.componentRef.close();
		}
		else {
			this.form.markAllAsTouched();
			this.snackBar.open("Отмеченные поля обязательны", "ОК");
		}
	}

	public addOnMap(): void {
		this.form.get("placeUrl")?.patchValue("");
		const dialogRef = this.dialog.open(MapComponent, {
			autoFocus: false
		});
		dialogRef.afterClosed().subscribe((marker) => {
			if (marker) {
				const placeUrl = {
					lat: marker.lat,
					lng: marker.lng
				};
				this.form.get("placeUrl")?.patchValue(placeUrl);
			}
		})
	}

	public test(e: any): void {
		// console.log(e);
	}
}
