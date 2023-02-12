import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from '../activity.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
	selector: 'app-add-activity',
	templateUrl: './add-activity.component.html',
	styleUrls: ['./add-activity.component.scss'],
	standalone: true,
	imports: [MatCheckboxModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatIconModule, CommonModule]
})
export class AddActivityComponent {
	public form: FormGroup;
  	constructor(
		private fb: FormBuilder,
		private activityService: ActivityService,
		private componentRef: MatDialogRef<AddActivityComponent>,
		private userService: UserService) {
		this.form = this.fb.group({
			category: this.fb.control<string>(""),
			description: this.fb.control<string>("Очень большое описание развлечения, которое не влазит в одной строку"),
			place: this.fb.control<string>("")
		});
	}

	public addActivity(): void {
		const activity = {
			category: this.form.get("category")?.value,
			description: this.form.get("description")?.value,
			place: this.form.get("place")?.value,
			rate: 0,
			usersSubscribed: [],
			imageName: "",
			date: new Date(1, 1, 1),
			placeUrl: "",
			userOwner: this.userService.getUser() as User
		};
		console.log(activity.userOwner);
		this.activityService.addActivity(activity);
		this.componentRef.close();
	}

	public test(e: any): void {
		console.log(e);
	}
}
