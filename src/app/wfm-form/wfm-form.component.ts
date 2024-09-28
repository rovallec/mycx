import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { profiles } from '../profile'
import { MainService } from '../main.service'

import { Location } from '../locations'
import { wfmForm } from '../wfmForm'

@Component({
  selector: 'app-wfm-form',
  templateUrl: './wfm-form.component.html',
  styleUrl: './wfm-form.component.css'
})
export class WfmFormComponent {
  profile!: profiles;
  tokenExpiration!: string;

  locations: Location[] = [];
  errorMessage: string | null = null;

  frmRes: wfmForm = {};

  constructor(
    private http: HttpClient,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile;
        this.frmRes.location = this.profile.officeLocation;
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;

     this.mainService.getLocations().subscribe({
      next: (response) => {
        this.locations = response;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching locations: ' + err.message;
      }
    });

  }

}
