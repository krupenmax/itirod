import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccountEditPopupComponent } from '../account-edit-popup/account-edit-popup.component';
import { User } from '../user';
import { UserService } from '../user.service';


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
		MatSnackBarModule
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
	public pageMode = "main";
	public user?: User;
	public form: FormGroup;

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private dialog: MatDialog,
		private cdr: ChangeDetectorRef,
		private snackBar: MatSnackBar
		) {
		this.user = this.userService.getUser();
		this.form = this.fb.group({
			name: this.fb.control<string>(this.user?.firstName as string),
			secondName: this.fb.control<string>(this.user?.lastName as string),
			nickname: this.fb.control<string>(this.user?.login as string),
			email: this.fb.control<string>(this.user?.email as string)
		});
	}

	public handle(e: any): void {
		this.pageMode = e.value;
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
				this.cdr.detectChanges();
			}
		})
	}
}
