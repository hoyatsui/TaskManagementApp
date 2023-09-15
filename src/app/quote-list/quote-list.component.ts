import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Quote } from '../../quote.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditQuoteComponent } from '../edit-quote/edit-quote.component';
import { DeleteQuoteComponent } from '../delete-quote/delete-quote.component';




@Component({
    selector: 'app-quote-list',
    templateUrl: './quote-list.component.html',
    styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
    quotes: Quote[] = [];
    selectedQuote!: Quote;
    p: number = 1; // Current page
    maxPage: number = 0; // Max pages
    itemsPerPage: number = 5;
    selectedColumn: string = 'quoteID';
    isDescending: boolean = false;
    searchString: string = '';

    constructor(private apiService: ApiService, private router: Router, public dialog: MatDialog) { }
    ngOnInit(): void {
        this.apiService.getQuotes().subscribe((quotes: Quote[]) => {
            console.log('Success, received quotes:', quotes);
            this.quotes = quotes as Quote[];
            this.maxPage = Math.ceil(this.quotes.length / this.itemsPerPage);
            console.log(this.quotes.length);
            console.log(this.maxPage);
        }
            ,
            error => {
                console.log('An error occurred:', error);
            });

    }
    updateItemsPerPage(): void {
        this.maxPage = Math.ceil(this.quotes.length / this.itemsPerPage);
        this.p = 1;
    }
    sortData(): void {
        this.quotes.sort((a, b) => {
            if (this.selectedColumn in a && this.selectedColumn in b) {
                let aValue = a[this.selectedColumn as keyof Quote];
                let bValue = b[this.selectedColumn as keyof Quote];
                if (this.selectedColumn === 'premium' && typeof (aValue) === 'string' && typeof (bValue) === 'string') {
                    aValue = parseFloat(aValue.replace('$', ''));
                    bValue = parseFloat(bValue.replace('$', ''));
                } else if (this.selectedColumn === 'formattedDueDate') {
                    aValue = new Date(a['dueDate']);
                    bValue = new Date(b['dueDate']);
                }
                if (typeof aValue === "number" && typeof bValue === "number") {
                    return this.isDescending ? bValue - aValue : aValue - bValue;
                }
                else {
                    if (aValue < bValue) {
                        return this.isDescending ? 1 : -1;
                    }
                    if (aValue > bValue) {
                        return this.isDescending ? -1 : 1;
                    }
                }
            }
            return 0;
        });

    }
    onSearch(): void {
        if (this.searchString.trim() === '') {
            this.apiService.getQuotes().subscribe((quotes: Quote[]) => {
                this.quotes = quotes;
            });
        } else {
            this.apiService.searchQuotes(this.searchString).subscribe((quotes: Quote[]) => {
                this.quotes = quotes;
            });
        }
    }
    view(id: number) {
        this.router.navigate(['/quote', id]);
    }

    edit(quote: Quote): void {
        const dialogRef = this.dialog.open(EditQuoteComponent, {
            width: '70%',
            data: quote
        });

        dialogRef.componentInstance.quoteUpdated.subscribe((updatedQuote: Quote) => {
            this.apiService.updateQuote(updatedQuote).subscribe(response => {
                console.log('Quote updated', response);
                this.apiService.getQuotes().subscribe((quotes: Quote[]) => {
                    this.quotes = quotes;
                });
            },
                error => {
                    console.log('Update failed', error);
                });
        });


        dialogRef.afterClosed();
    }
    delete(id: number) {
        const dialogRef = this.dialog.open(DeleteQuoteComponent, {
            width: '30%'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.deleteQuote(id.toString()).subscribe(response => {
                    this.apiService.getQuotes().subscribe((quotes: Quote[]) => {
                        this.quotes = quotes;
                    }
                        ,
                        error => {
                            console.log('An error occurred:', error);
                        });
                }
                );
            }
        }
        );
    }

    add(): void {
        const dialogRef = this.dialog.open(EditQuoteComponent, {
            width: '80%'
        });


        dialogRef.componentInstance.quoteUpdated.subscribe((updatedQuote: Quote) => {
            this.apiService.addQuote(updatedQuote).subscribe(response => {
                console.log('Quote added', response);
                this.apiService.getQuotes().subscribe((quotes: Quote[]) => {
                    this.quotes = quotes;
                });
            },
                error => {
                    console.log('Update failed', error);
                });
        });


        dialogRef.afterClosed();
    }

    getDisplayedPages(currentPage: number, maxPage: number): number[] {
        const delta = 2;
        const range = [];
        let start = Math.max(2, currentPage - delta);
        let end = Math.min(maxPage - 1, currentPage + delta);

        if (currentPage - 1 <= 2) {
            end = Math.min(maxPage - 1, start + 4);
        }

        if (maxPage - currentPage <= 2) {
            start = Math.max(2, end - 4);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    }


}
