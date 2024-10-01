import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { quickLinks } from '../quickLinks';


@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrl: './quicklinks.component.css'
})
export class QuicklinksComponent {

  constructor(private http: HttpClient) {}

  apps!: quickLinks[];

  ngOnInit() {
    this.http.get<quickLinks[]>('https://graph.microsoft.com/v1.0/me')
    .subscribe(quickLinks => {
      this.apps = quickLinks;
    });
  }

}
