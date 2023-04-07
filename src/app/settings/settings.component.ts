import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LayoutService } from '../services/layout.service';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { User } from '../types/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [ MatSlideToggleModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatDialogModule ]
})
export class SettingsComponent {
	public form: FormGroup;
	constructor(
		private layoutService: LayoutService,
		private fb: FormBuilder,
		private userService: UserService,
		private dialog: MatDialog,
		private router: Router
		) {
		this.form = this.fb.group({
			isNightMode: this.fb.control<boolean>(this.layoutService.getNightThemeConfig())
		});
	}

	public handleNightMode(e: any): void {
		this.layoutService.setNightThemeConfig(e);
	}

	public getNightMode(): boolean {
		return this.layoutService.getNightThemeConfig();
	}

	public changePassword(): void {
		this.dialog.open(ChangePasswordComponent, {
			autoFocus: false,
		})
	}

	public changeEmail(): void {
		this.dialog.open(ChangeEmailComponent, {
			autoFocus: false,
		})
	}

	public deleteAccount(): void {
		this.userService.deleteUser();
		this.router.navigateByUrl("");
	}
}
