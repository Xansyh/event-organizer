import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { timer } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  image = null;
  imgURL: any;
  eventId: string;
  params = {
    title: "",
    date: "",
    eventId: "",
    price: "",
    image: "",
  };
  disabled = true;
  uploadEventForm = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    date: this.fb.control('', [Validators.required]),
    price: this.fb.control('', [Validators.required]),
  });

  constructor(
    private baseService: BaseService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.eventId = uuid();    
  }

  enableButton() {
    if (this.uploadEventForm.valid && this.image != null) {
      this.disabled = false;
      var params = this.uploadEventForm.value;
      params.image = this.image;
      this.params = params;
    } else {
      this.disabled = true;
    }
  }

  uploadEvent() {
    if (this.uploadEventForm.valid) {
      this.baseService.uploadEvent(this.params);
    }
  }

  getEvent() {
    this.baseService.getStorage('86dcfed8-1b02-434d-85f1-018bc75fb6b6').subscribe(o => {
      console.log(o);
    });
  }

  setImage(event: any) {
    this.image = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.image); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.enableButton();
  }

  refresh() {
    timer(3000).subscribe(() => {
      window.location.reload();
    })
  }

}
