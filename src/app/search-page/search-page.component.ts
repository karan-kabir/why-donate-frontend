import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
// import { SAMPLE_RESULTS } from './sample-results';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchControl: FormControl;

  filteredResults$: Observable<string[]>;

  // results = SAMPLE_RESULTS;
  results = []

  constructor() {
    this.searchControl = new FormControl('');
    this.filteredResults$ = this.searchControl.valueChanges.pipe(
      startWith(null),
      (map((val: any) => this.filterResults(val))),
      (map((val: any) => val.slice(0, 4)))
    );
  }

  ngOnInit(): void {
  }

  private filterResults(val: string): string[] {
    return val ? this.results.filter((v: any) => v.toLowerCase().indexOf(val.toLowerCase()) === 0) : [];
  }

}
