import { Component, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-account-edit-popup',
	templateUrl: './account-edit-popup.component.html',
	styleUrls: ['./account-edit-popup.component.scss'],
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		ReactiveFormsModule
	]
})
export class AccountEditPopupComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public form: FormGroup,
		private dialogRef: MatDialogRef<AccountEditPopupComponent>) {}

	public handle(): void {
		this.dialogRef.close(this.form);
	}
}
