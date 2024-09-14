import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { profiles } from '../profile'

@Component({
  selector: 'app-wfm-form',
  templateUrl: './wfm-form.component.html',
  styleUrl: './wfm-form.component.css'
})
export class WfmFormComponent {
  profile!: profiles;
  tokenExpiration!: string;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile;
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
  }

}
