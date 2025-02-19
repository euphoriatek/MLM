import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-confirm-dialog',
  template: `
   <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button class="grey-btn btn" (click)="onCancel()">Cancel</button>
      <button class="orange-btn btn" (click)="onConfirm()">OK</button>
    </div>
  `
})
export class NewConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close('confirmed');
  }

  onCancel(): void {
    this.dialogRef.close('cancelled');
  }
}
