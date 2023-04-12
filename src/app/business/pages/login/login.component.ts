import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(value => {
      if (this.loginForm.valid) {
        this.errorMessage = null;
      }
    }
    );
  }



  submit() {
    console.log(this.loginForm.valid)

    if (this.loginForm.valid) {
      console.log("Making http request");
    } else {
      this.errorMessage = "Please enter username and password";
    }
  }

}
