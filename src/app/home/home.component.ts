import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
  }

  addUser() {
    this.baseService.createUser('Xansyh');
  }

  

}
