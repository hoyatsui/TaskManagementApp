import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quote } from '../../quote.model';

@Component({
    selector: 'app-edit-quote',
    templateUrl: './edit-quote.component.html',
    styleUrls: ['./edit-quote.component.css']
})
export class EditQuoteComponent implements OnInit {
    @Input() quote!: Quote;
    @Output() quoteUpdated = new EventEmitter<Quote>();
    public title: string = 'Edit Quote';
    quoteForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EditQuoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Quote) {
        this.quoteForm = this.fb.group({
            quoteID: ['', [Validators.required]],
            quoteType: ['', [Validators.required]],
            description: ['', [Validators.required]],
            dueDate: ['', [Validators.required]],
            premium: ['', [Validators.required]],
            sales: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        if (this.data) {
            // edit()
            this.title = 'Update Quote';
            this.data.premium = this.data.premium.replace('$', '');
            this.quoteForm.patchValue(this.data);
        } else {
            // create()
            this.title = 'Add New Quote';
            this.quoteForm.patchValue({
                quoteID: 0,
                quoteType: 'Auto',
                dueDate: new Date().toISOString().slice(0, 16),
            });
        }

    }

    onSubmit() {
        if (this.quoteForm.valid) {
            let formValue = this.quoteForm.value;

            formValue.premium = '$' + formValue.premium;
            this.quoteUpdated.emit(this.quoteForm.value);
            this.dialogRef.close();
        }
    }
}