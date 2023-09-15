import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    loginForm!: FormGroup;
    registerForm!: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {

    }
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required,]],
            confirmPassword: ['', Validators.required]
        });

    }
    login() {
        if (this.loginForm.valid) {
            this.authService.login(
                this.loginForm.get('username')!.value,
                this.loginForm.get('password')!.value
            ).subscribe(
                // Handle success and failure
                res => {
                    // redirect to quotes page
                    console.log('Login Response:', res);
                    this.router.navigate(['/quotes']);
                    this.openSnackBar("Login Successful", "Close");
                },
                err => {
                    console.log('Login Error:', err);
                    this.router.navigate(['/auth']);
                    this.openSnackBar("Login Failed", "Close");
                }

            );
        }
    }

    register() {
        if (this.registerForm.valid) {
            this.authService.register(
                this.registerForm.get('username')!.value,
                this.registerForm.get('password')!.value
            ).subscribe(
                // Handle success and failure
                res => {
                    console.log(res);
                    this.openSnackBar("Registration Successful", "Close");
                    this.router.navigate(['/auth']);
                },
                err => {
                    console.log(err);
                    this.openSnackBar("Registration Failed", "Close");
                }
            );
        }
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            panelClass: ['mat-snack-bar'],
            verticalPosition: 'top',
            horizontalPosition: 'end'
        });
    }
}