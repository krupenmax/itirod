import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	standalone: true,
	imports: [
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		CommonModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatSnackBarModule,
	],
})
export class LoginComponent implements OnInit {
	public isPasswordVisible = false;
	public form: FormGroup;
	public isLogged: "untouched" | "failed" | "logged";

	constructor(
		private router: Router,
		private dialog: MatDialog,
		private fb: FormBuilder,
		private userService: UserService,
		private snackBar: MatSnackBar,
		private backendService: BackendService
		) {
		this.isLogged = "untouched";
		this.form = this.fb.group({
				login: this.fb.control<string>(""),
				password: this.fb.control<string>("")
		});
	}

	public openRegistration(): void {
		this.dialog.open(RegistrationComponent, {
			minWidth: "500px",
			autoFocus: false
		})
	}

	public login(): void {
		let isFound = false;
		this.userService.getUsers().forEach(user => {
			if (user.login === this.form.get("login")?.value && user.password === this.form.get("password")?.value) {
				this.userService.setUser(user);
				this.router.navigateByUrl("home");
				isFound = true;
			}
		});
		if (!isFound) {
			this.snackBar.open("Неверные данные", "Ок", {
				duration: 3000
			});
		}
	}

	ngOnInit(): void {
	}

}
