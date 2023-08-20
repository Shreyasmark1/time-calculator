import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'total',
    templateUrl: 'total.component.html',
    styleUrls: ['./total.component.css'],
})
export class Total {
    constructor(
        public dialogRef: MatDialogRef<Total>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}