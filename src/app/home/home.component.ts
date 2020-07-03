import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm = this.fb.group({
    keyWords: ''
  });

  constructor(
    private baseService: BaseService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  goToSearchPage() {
    this.searchForm.updateValueAndValidity();
    const queryParams = this.searchForm.value;
    // this.router.navigate(['/view-properties', 'BUY', 'public', 'keywordSearch'], {
    //   queryParams
    // });
  }

}
