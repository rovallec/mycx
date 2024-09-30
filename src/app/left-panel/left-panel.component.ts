import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { profiles } from '../profile';
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'], // Change `styleUrl` to `styleUrls`
})
export class LeftPanelComponent implements OnInit {
  activeItem: string = 'profile'; // Default active item
  profilePhoto: string | null = null; // Variable to hold the photo URL
  profile!: profiles;


  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch user profile photo as a Blob
    this.http.get('https://graph.microsoft.com/v1.0/me/photo/$value', { responseType: 'blob' })
      .subscribe(photoBlob => {
        // Create a URL for the Blob
        const photoUrl = URL.createObjectURL(photoBlob);
        this.profilePhoto = photoUrl; // Store the URL for use in the template
      });

      this.http.get<profiles>('https://graph.microsoft.com/v1.0/me')
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  setActive(item: string): void {
    this.activeItem = item;
  }

  // Method to check if an item is active
  isActive(item: string): boolean {
    return this.activeItem === item;
  }
}
