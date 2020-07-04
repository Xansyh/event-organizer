import { timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  title = 'Login';
  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private baseService: BaseService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { }

  onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const params = this.loginForm.value;
      this.baseService.signIn(params.email, params.password).subscribe(o => {
        console.log(o);
        console.log(o.user.uid);
        this.getUser(o.user.uid);
      });
      // timer(1000).subscribe(() => {
      //   window.scroll({
      //     top: 0,
      //     left: 0,
      //     behavior: 'smooth'
      //   });
      // });
      // this.dialogRef.close(true);
      // this.router.navigate(['/']);
    }
  }

  getErrorString(field: AbstractControl) {
    return field.hasError('required') ? 'This field is required' : '';
  }

  getUser(uid: string) {
    this.baseService.getUserList(uid).subscribe(o => {
      console.log(o);
      if (o) {
        window.location.reload();
      }
    });
  }

}
