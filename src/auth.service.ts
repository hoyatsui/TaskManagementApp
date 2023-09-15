import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

// the decorator marks the class as injectable, meaning Angular can instantiate this service and inejct it into other components.
// setting providedIn: 'root' means it is registered as a singleton with the root injector. ensures only one instance of the service exists and is shared throughout the application.
@Injectable({ providedIn: 'root' })
export class AuthService {
    // HttpClient is injected into the constructor so the service can make HTTP requests to the backend API.
    constructor(private http: HttpClient) { }
    // login method sends a POST request to the server with the username and password in the body of the request. 
    login(username: string, password: string) {
        // tap is an RxJS operator that performs a side effect for each emission on thte source Observable. but returns an Observable that is identical to the source.
        // side effects means the the actions that do not change the Observable itself, but consue it in some way.
        //the tap operator is often sued for storing some values as a side effect of an Observable action.
        return this.http.post<any>('https://localhost:7142/api/User/login', { username: username, password: password }).pipe(tap(res => {
            const token = res['token'];
            localStorage.setItem('jwt', token);
        }));
    }

    register(username: string, password: string) {
        return this.http.post('https://localhost:7142/api/User/register', { username: username, password: password });
    }
}