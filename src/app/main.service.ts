import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './locations'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'http://localhost/phpScripts/'; // URL to your PHP script

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + 'getLocations.php');
  }

}
