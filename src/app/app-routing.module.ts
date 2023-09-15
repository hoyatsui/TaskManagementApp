import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { AuthGuard } from './auth.guard';
import { QuoteDetailComponent } from './quote-detail/quote-detail.component';

const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'quotes', component: QuoteListComponent, canActivate: [AuthGuard] },
    { path: 'quote/:id', component: QuoteDetailComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
