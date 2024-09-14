import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { profiles } from '../profile'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile!: profiles;
  tokenExpiration!: string;

  constructor(
    private http: HttpClient
  ) { }

  // When the page loads, perform an HTTP GET request from the Graph /me endpoint
  ngOnInit() {
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile;
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
  }
}
