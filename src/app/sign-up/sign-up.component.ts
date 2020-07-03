import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  message: string;
  title = 'Sign Up';
  signUpForm = this.fb.group({
    username: this.fb.control('',  [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private baseService: BaseService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSignUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      const params = this.signUpForm.value;
      this.baseService.signUp(params.email, params.password).subscribe(o => {
        console.log(o);
        console.log(o.user.uid);
        const userParams = {
          uid: o.user.uid,
          username: params.username,
          email: o.user.email,
          role: "MEMBER",
        };
        this.baseService.createUser(userParams);
      });
      // this.router.navigate(['/']);
    }
  }

}
