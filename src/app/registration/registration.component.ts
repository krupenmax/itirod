import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [ MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule, CommonModule ]
})
export class RegistrationComponent implements OnInit {
	public form: FormGroup;
	public isPasswordVisible = true;

  	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private componentRef: MatDialogRef<RegistrationComponent>
		) {
		this.form = this.fb.group({
			login: this.fb.control<string>("", Validators.required),
			password: this.fb.control<string>("", Validators.required),
			passwordRepeat: this.fb.control<string>("", Validators.required),
			name: this.fb.control<string>("", Validators.required),
			secondName: this.fb.control<string>("", Validators.required)
		});
	}

	public addUser(): void {
		if (this.form.valid) {
			const user: User = {
				name: this.form.get("name")?.value,
				secondName: this.form.get("secondName")?.value,
				password: this.form.get("password")?.value,
				login: this.form.get("login")?.value
			};
			this.userService.addUser(user);
			this.componentRef.close();
		}
		else {
			this.form.markAllAsTouched();
		}
	}

  	ngOnInit(): void {
  	}

}
