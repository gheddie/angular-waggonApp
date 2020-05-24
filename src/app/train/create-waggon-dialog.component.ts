import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-overview-example-dialog',
    templateUrl: 'create-waggon-dialog.html'
})
export class CreateWaggonDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<CreateWaggonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CreateWaggonDialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface CreateWaggonDialogData {
  waggonNumber: string;
  waggonType: string;
}
