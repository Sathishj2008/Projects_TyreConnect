import { Component, ElementRef, ViewChild } from '@angular/core';
import { APIService } from '../core/service';
import { SearchResult } from '../core/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  searchResults: SearchResult[] = new Array<SearchResult>();
  error: boolean = false;
  success: boolean = false;
  errorMessage: string;
  @ViewChild('searchText', { static: false }) searchText: ElementRef;
  @ViewChild('searchSubText', { static: false }) searchSubText: ElementRef;
  constructor(
    private apiservice: APIService
  ) {

  }

  search(text: string, subText: string) { 
    this.success = false;
    if (this.hasErrors(text, subText)) {
      this.error = true;
      this.showError();
      return;
    } 
    
    this.apiservice.search(text, subText)
      .subscribe(
        res => {
          this.searchResults = res;
          if (this.searchResults.length > 0) {
            this.success = true;
          }
          else {
            this.error = true;
            this.errorMessage = "No Matches found";
            this.showError();
          }
        },
        err => {
          this.error = true;
          this.errorMessage = "An unexpected error occured, please try again later";
          this.showError();
        }
      );
  }
  reset() {
    this.searchText.nativeElement.value = '';
    this.searchSubText.nativeElement.value = '';
  }

  /// Returns true when there is an error
  hasErrors(text: string, subText: string): boolean {


    if (text.length == 0 && subText.length == 0) {
      this.errorMessage = "Text & subtext cannot be empty";
      return true;
    } if (text.length == 0) {
      this.errorMessage = "Text cannot be empty";
      return true;
    } if (subText.length == 0) {
      this.errorMessage = "Subtext cannot be empty";
      return true;
    }
    if (text.length > 50) {
      this.errorMessage = "Text length cannot be more than 50";
      return true;
    }
    if (subText.length >= text.length) {
      this.errorMessage = "Subtext must be atleast one character less than text";
      return true;
    }
    return false;
  }

  showError() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 7000)
  }
}
