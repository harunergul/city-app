import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  errorMessage: string | null;

  loginRequest = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router
    ) {
  }
  ngOnInit(): void {

    this.loginForm.valueChanges.subscribe(value => {
      if (this.loginForm.valid) {
        this.errorMessage = null;
      }
    });
  }



  submit() {

    if (this.loginForm.valid) {
      this.loginRequest = true;
      this.authService.login(this.loginForm.value).subscribe(
        {
          next: (value) => {
            if(value){
              this.router.navigateByUrl("/");
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.errorMessage  = err?.error?.message
            this.loginRequest = false;
          },
          complete: () => {

          }
        });



    } else {
      this.errorMessage = "Please enter username and password";
    }
  }

 

}
