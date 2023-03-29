import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../types/user';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		CommonModule,
		MatSnackBarModule
	]
})
export class RegistrationComponent implements OnInit {
	public form: FormGroup;
	public isPasswordVisible = false;

  	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private componentRef: MatDialogRef<RegistrationComponent>,
		private snackBar: MatSnackBar,
		) {
		this.form = this.fb.group({
			login: this.fb.control<string>("", Validators.required),
			password: this.fb.control<string>("", Validators.required),
			passwordRepeat: this.fb.control<string>("", Validators.required),
			name: this.fb.control<string>("", Validators.required),
			secondName: this.fb.control<string>("", Validators.required),
			email: this.fb.control<string>("", [Validators.email, Validators.required])
		});
	}

	public addUser(): void {
		if (this.form.valid) {
			if (this.form.get("password")?.value === this.form.get("passwordRepeat")?.value) {
				const user: User = {
					firstName: this.form.get("name")?.value,
					lastName: this.form.get("secondName")?.value,
					password: this.form.get("password")?.value,
					login: this.form.get("login")?.value,
					username: this.form.get("username")?.value,
					email: this.form.get("email")?.value
				};
				this.userService.addUser(user);
				this.componentRef.close();
			}
			else {
				this.snackBar.open("Пароли не совпадают", "ОК", {
					duration: 3000
				});
			}
		}
		else {
			this.form.markAllAsTouched();
		}
	}

  	ngOnInit(): void {
  	}

}
