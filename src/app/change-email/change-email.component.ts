import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../types/user';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
  standalone: true,
  imports: [ MatDialogModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule ]
})
export class ChangeEmailComponent {
	public form: FormGroup
	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<ChangeEmailComponent>,
		private logService: LogService) {
		this.form = this.fb.group({
			oldPassword: this.fb.control<string>("", Validators.required),
			newEmail: this.fb.control<string>("", Validators.required),
			repeatEmail: this.fb.control<string>("", Validators.required)
		});
	}

	public changeEmail(): void {
		if (this.form.value.oldPassword === this.userService.getUser()?.password) {
			if (this.form.value.repeatEmail === this.form.value.newEmail) {
				this.userService.changePassword(this.form.value.newPassword, this.userService.getUser() as User);
				this.snackBar.open("Почта успешно изменен", "ОК", {
					verticalPosition: "bottom",
					horizontalPosition: "center",
					duration: 3000,
				});
				this.logService.addLog("Почта изменена.");
				this.dialogRef.close();
			}
			else {
				this.snackBar.open("Почты не совпадают", "ОК", {
					verticalPosition: "bottom",
					horizontalPosition: "center",
					duration: 3000,
				});
			}
		}
		else {
			console.log(this.form.value.oldPassword);
			console.log(this.userService.getUser()?.password);
			this.snackBar.open("Неверный пароль", "ОК", {
				verticalPosition: "bottom",
				horizontalPosition: "center",
				duration: 3000,
			});
		}
	}
}
