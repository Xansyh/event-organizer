import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/base.service';
import { LoginComponent } from './../login/login.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  loggedIn = false;
  username = "";
  accessToken = null;

  constructor(
    public dialog: MatDialog,
    public baseService: BaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('accessToken');
    if (this.accessToken) {
      this.loggedIn = true;
      this.username = localStorage.getItem('username');
    } else {
      this.loggedIn = false;
    }
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  openSignUpDialog() {
    this.dialog.open(SignUpComponent, {
      width: '400px'
    });
  }

  signOut() {
    this.baseService.signOut();
  }

}
