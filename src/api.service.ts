import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from './quote.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiServer = "https://localhost:7142/api";
    constructor(private http: HttpClient) { }

    // Create
    addQuote(quote: Quote): Observable<Quote> {
        return this.http.post<Quote>(`${this.apiServer}/Quote`, quote);
    }

    // Read
    getQuotes(): Observable<Quote[]> {
        console.log("getQuotes");
        return this.http.get<Quote[]>(`${this.apiServer}/Quote`);
    }

    getQuote(id: string): Observable<Quote> {
        return this.http.get<Quote>(`${this.apiServer}/Quote/${id}`);
    }

    // Update
    updateQuote(quote: Quote): Observable<Quote> {
        return this.http.put<Quote>(`${this.apiServer}/Quote`, quote);
    }

    // Delete
    deleteQuote(id: string): Observable<Quote> {
        return this.http.delete<Quote>(`${this.apiServer}/Quote/${id}`);
    }

    // Search
    searchQuotes(searchTerm: string): Observable<Quote[]> {
        return this.http.get<Quote[]>(`${this.apiServer}/Quote/search?term=${searchTerm}`);
    }
}
