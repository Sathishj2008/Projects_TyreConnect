import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { SearchResult } from './model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class APIService { 

  constructor(
    private http: HttpClient 
  ) { }

  /**
   * Perform a global search for courses matching the filter parameters.
   *
   */
  search(text: string, subText: string): Observable<SearchResult[]> { 
    let requestParams = new HttpParams();
    requestParams = requestParams.append('text', text);
    requestParams = requestParams.append('subText', subText);
      return this.http.get<SearchResult[]>(environment.api + '/string-operation/search' , {
        params: requestParams
      }); 
  }

}