import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './locations'; // Adjust the path as needed
import { Verticals } from './verticals';
import { issueTypes } from './issueTypes';
import { wfmForm } from './wfmForm';
import { quickLinks } from './quickLinks';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'https://my.cxperts.us/phpScripts/'; // URL to your PHP script

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + 'getLocations.php');
  }

  getVerticals(): Observable<Verticals[]> {
    return this.http.get<Location[]>(this.apiUrl + 'getVerticals.php');
  }
  
  getIssueTypes(): Observable<issueTypes[]> {
    return this.http.get<Location[]>(this.apiUrl + 'getIssueTypes.php');
  }

  getQuickLinks(): Observable<quickLinks[]> {
    return this.http.get<quickLinks[]>(this.apiUrl + 'getquickLinks.php');
  }

  insertAdjustment(adj:wfmForm):Observable<any>{
    return this.http.post<any>(this.apiUrl + 'insertAdjustment.php', adj);
  }
}
