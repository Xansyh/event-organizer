import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private baseService: BaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signUpClicked() {
    console.log('email: '+this.email+', password: '+this.password);
    this.baseService.SignUp(this.email, this.password);
    // this.router.navigate(['/', 'login']);
  }

}
