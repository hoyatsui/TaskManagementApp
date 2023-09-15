import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/api.service';
import { Quote } from 'src/quote.model';

@Component({
    selector: 'app-quote-detail',
    templateUrl: './quote-detail.component.html',
    styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private apiService: ApiService) { }
    quote!: Quote;
    quoteDetails: any[] = [];
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) return;
        this.apiService.getQuote(id).subscribe((quote: any) => {
            this.quote = quote;
            this.quoteDetails = Object.keys(this.quote).map(key => ({ name: key, value: quote[key] }));

            console.log('Success, received quote:', quote);
        }, error => {
            console.log('An error occurred:', error);
        });

    }

    getImgSource(quoteType: string): string {
        switch (quoteType) {
            case 'Auto':
                return '../../assets/imgs/auto.png';
            case 'House':
                return '../../assets/imgs/house.png';
            case 'Boat':
                return '../../assets/imgs/boat.png';
            default:
                return '../../assets/imgs/general.png';
        }
    }
}


