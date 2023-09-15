import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';


import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { AuthInterceptor } from 'src/auth.interceptor';
import { GlobalErrorHandler } from 'src/global-error-handler';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { DeleteQuoteComponent } from './delete-quote/delete-quote.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        QuoteListComponent,
        QuoteDetailComponent,
        EditQuoteComponent,
        DeleteQuoteComponent,
        HeaderComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientModule,
        MatDialogModule,
        NgxPaginationModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
