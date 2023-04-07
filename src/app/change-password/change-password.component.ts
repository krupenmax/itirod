import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../types/user';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [ MatDialogModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule ]
})
export class ChangePasswordComponent {
	public form: FormGroup
	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<ChangePasswordComponent>,
		private logService: LogService) {
		this.form = this.fb.group({
			oldPassword: this.fb.control<string>("", Validators.required),
			newPassword: this.fb.control<string>("", Validators.required),
			repeatPassword: this.fb.control<string>("", Validators.required)
		});
	}

	public changePassword(): void {
		if (this.form.value.oldPassword === this.userService.getUser()?.password) {
			if (this.form.value.repeatPassword === this.form.value.newPassword) {
				if (this.form.value.newPassword !== this.form.value.oldPassword) {
					this.userService.changePassword(this.form.value.newPassword, this.userService.getUser() as User);
					this.snackBar.open("Пароль успешно изменен", "ОК", {
						verticalPosition: "bottom",
						horizontalPosition: "center",
						duration: 3000,
					});
					this.logService.addLog("Пароль был изменен");
					this.dialogRef.close();
				}
				else {
					this.snackBar.open("Введите другой пароль", "ОК", {
						verticalPosition: "bottom",
						horizontalPosition: "center",
						duration: 3000,
					});
				}
			}
			else {
				this.snackBar.open("Пароли не совпадают", "ОК", {
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
