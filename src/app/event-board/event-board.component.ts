import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';

@Component({
  selector: 'app-event-board',
  templateUrl: './event-board.component.html',
  styleUrls: ['./event-board.component.scss']
})
export class EventBoardComponent implements OnInit {
  
  constructor(
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.baseService.getFeaturedEvents().subscribe(events => {
      console.log(events);
      events.forEach(event => {
        if (event.imgUrl == null) {
          this.baseService.getStorageImage(event.eventId).subscribe(imgUrl => {
            const params = {
              eventId: event.eventId,
              imgUrl: imgUrl,
            }
            this.baseService.updateEvent(params);
          })
        }
      });
      
    });
  }

  

}
