import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <div class="delete-modal">
    <h2>{{data.title}}</h2>
    <p>{{data.message}}</p>

    <ng-container *ngIf="data.type === 'poi'; else showOther">
      <div class="modal-btn">
        <button class="orange-btn btn" [mat-dialog-close]="true">Yes</button>
        <button class="grey-btn btn" [mat-dialog-close]="false" id="no_btn">No</button>
      </div>
    </ng-container>

    <ng-template #showOther>
      <div class="modal-btn">
        <button class="orange-btn btn" [mat-dialog-close]="true">Delete</button>
        <button class="grey-btn btn" [mat-dialog-close]="false" id="no_btn">Cancel</button>
      </div>
    </ng-template>
  </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, type: string }) {}
}

// <div class="delete-icon"><i class="fa-solid fa-trash"></i></div>
