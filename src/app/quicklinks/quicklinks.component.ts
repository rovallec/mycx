import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { quickLinks } from '../quickLinks';

import { MainService } from '../main.service'



@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrl: './quicklinks.component.css'
})
export class QuicklinksComponent {

  constructor(private http: HttpClient,    private mainService: MainService
  ) {}

  apps!: quickLinks[];
  errorMessage: string | null = null;


  ngOnInit() {
    this.mainService.getQuickLinks().subscribe({
      next: (response) => {
        this.apps = response;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching locations: ' + err.message;
      }
    });
  }

}
