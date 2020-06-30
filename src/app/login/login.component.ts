import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private baseService: BaseService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { }

  onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const params = this.loginForm.value;
      this.baseService.SignIn(params.email, params.password).subscribe(o => {
        console.log(o);
      });
      // this.router.navigate(['/']);
    }
  }

  getErrorString(field: AbstractControl) {
    return field.hasError('required') ? 'This field is required' : '';
  }

}
