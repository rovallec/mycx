import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { profiles } from '../profile'
import { MainService } from '../main.service'

import { Location } from '../locations'
import { wfmForm } from '../wfmForm'
import { Verticals } from '../verticals';
import { issueTypes } from '../issueTypes';

@Component({
  selector: 'app-wfm-form',
  templateUrl: './wfm-form.component.html',
  styleUrl: './wfm-form.component.css'
})
export class WfmFormComponent {
  profile!: profiles;
  tokenExpiration!: string;
  submitted:number = 0;

  locations: Location[] = [];
  verticals: Verticals[] = [];
  issueTypes: issueTypes[] = [];
  errorMessage: string | null = null;

  startDateTime: string | null = null;
  endDateTime: string | null = null;

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
    this.frmRes.action = "YES";
    this.frmRes.adjustment = "YES";

    this.mainService.getVerticals().subscribe({
      next:(response)=>{
        this.verticals = response;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching verticals: ' + err.message;
      }
    })

    this.mainService.getIssueTypes().subscribe({
      next:(response)=>{
        this.issueTypes = response;
      },
      error:(err)=>{
        this.errorMessage = 'Error fetching issueTypes: ' + err.message;
      }
    })

     this.mainService.getLocations().subscribe({
      next: (response) => {
        this.locations = response;
      },
      error: (err) => {
        this.errorMessage = 'Error fetching locations: ' + err.message;
      }
    });

  }

  setStart(dt:string){
    this.startDateTime = dt;
    console.log(dt);
    this.frmRes.startDateTime = this.startDateTime;
    this.calculateTimeDifference();
  }

  setEnd(dt:string){
    this.endDateTime = dt;
    console.log(dt);
    this.frmRes.endDateTime = this.endDateTime;
    this.calculateTimeDifference();
  }

    calculateTimeDifference(): void {
    if (this.startDateTime && this.endDateTime) {
      const start = new Date(this.startDateTime);
      const end = new Date(this.endDateTime);

      // Ensure that end time is after start time
      if (end > start) {
        const diffMs = end.getTime() - start.getTime(); // Difference in milliseconds
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Difference in hours
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes

        this.frmRes.totalTime = (diffHours + (diffMinutes/60)).toFixed(3);
      } else {
        console.log('End DateTime must be after Start DateTime');
      }
    }
  }

  submitForm(){
    this.frmRes.employee = this.profile.mail;
    this.frmRes.email = this.profile.mail;
    if(this.checkFrm()){
      console.log(this.frmRes)
      this.mainService.insertAdjustment(this.frmRes).subscribe({
        next:(response)=>{
          if(response == '1'){
            this.submitted = 1;
            this.showSuccessAlert();
          }else{
            console.log(response);
          }
        }
      })
    }else{
      this.showDangerAlert();
    }
  }
  
  checkFrm():boolean{
    if (this.frmRes.email === null || this.frmRes.email === undefined || this.frmRes.email === '') {
      return false;
    }
    
    if (this.frmRes.location === null || this.frmRes.location === undefined || this.frmRes.location === '') {
      return false;
    }
    
    if (this.frmRes.employee === null || this.frmRes.employee === undefined || this.frmRes.employee === '') {
      return false;
    }
    
    if (this.frmRes.vertical === null || this.frmRes.vertical === undefined || this.frmRes.vertical === '') {
      return false;
    }
    
    if (this.frmRes.startDateTime === null || this.frmRes.startDateTime === undefined || this.frmRes.startDateTime === '') {
      return false;
    }
    
    if (this.frmRes.endDateTime === null || this.frmRes.endDateTime === undefined || this.frmRes.endDateTime === '') {
      return false;
    }
    
    if (this.frmRes.totalTime === null || this.frmRes.totalTime === undefined || this.frmRes.totalTime === '') {
      return false;
    }
    
    if (this.frmRes.issueType === null || this.frmRes.issueType === undefined || this.frmRes.issueType === '') {
      return false;
    }
    
    if (this.frmRes.details === null || this.frmRes.details === undefined || this.frmRes.details === '') {
      return false;
    }
    
    if (this.frmRes.adjustment === null || this.frmRes.adjustment === undefined || this.frmRes.adjustment === '') {
      return false;
    }
    
    if (this.frmRes.action === null || this.frmRes.action === undefined || this.frmRes.action === '') {
      return false;
    }
    
    return true; // If all fields are filled
  }

  showSuccessAlert() {
    this.frmRes = {};
    this.frmRes.email = this.profile.mail;
    this.frmRes.employee = this.profile.mail;
    this.frmRes.action = "YES";
    this.frmRes.adjustment = "YES";
    const alertElement = document.getElementById('success-alert');
    if (alertElement) {
      alertElement.style.display = 'block'; // Show the alert

      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
    }
  }
  
  showDangerAlert() {
    this.frmRes = {};
    this.frmRes.email = this.profile.mail;
    this.frmRes.employee = this.profile.mail;
    this.frmRes.action = "YES";
    this.frmRes.adjustment = "YES";
    const alertElement = document.getElementById('danger-alert');
    if (alertElement) {
      alertElement.style.display = 'block'; // Show the alert

      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
    }
  }
}
