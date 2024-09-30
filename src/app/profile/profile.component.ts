import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { profiles } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Fix here: Change `styleUrl` to `styleUrls`
})
export class ProfileComponent implements OnInit {
  profile!: profiles;
  tokenExpiration!: string;
  profilePhoto: string | null = null; // Change to string to hold the image URL

  constructor(private http: HttpClient) {}

  // When the page loads, perform an HTTP GET request from the Graph /me endpoint
  ngOnInit() {
    // Fetch user profile
    this.http.get<profiles>('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile;
      });

    // Fetch user profile photo as a Blob
    this.http.get('https://graph.microsoft.com/v1.0/me/photo/$value', { responseType: 'blob' })
      .subscribe(photoBlob => {
        // Create a URL for the Blob
        const photoUrl = URL.createObjectURL(photoBlob);
        this.profilePhoto = photoUrl; // Store the URL for use in the template
        console.log(this.profilePhoto);
      });

    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
  }
}
