import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-event-card',
  templateUrl: './simple-event-card.component.html',
  styleUrls: ['./simple-event-card.component.scss']
})
export class SimpleEventCardComponent implements OnInit {
  @Input()
  eventId: any;
  @Input()
  title: any;
  @Input()
  price: any;
  @Input()
  date: any;
  @Input()
  imgUrl: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigate() {
    console.log(this.eventId);
    
  }

}
