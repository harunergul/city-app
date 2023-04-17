import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../states/auth/auth.actions';
import { selectLoginError } from '../../states/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null;

  loginRequest = false;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.select(selectLoginError).subscribe((err) => {
      this.errorMessage = err.message;
    });

    this.loginForm.valueChanges.subscribe((value) => {
      if (this.loginForm.valid) {
        this.errorMessage = null;
      }
    });
  }

  submit() {
    this.store.dispatch(AuthActions.loginRequest(this.loginForm.value));
  }
}
