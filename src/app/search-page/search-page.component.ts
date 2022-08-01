import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { lastValueFrom, map } from "rxjs";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"]
})
export class SearchPageComponent implements OnInit {
  displayedColumns: string[] = [
    "Title",
    "Year",
    "Rated",
    "Released",
    "Runtime",
    "Genre",
    "Director",
    "Writer",
    "Actors",
    "Language"
  ];
  dataSource = [];
  searchControl: FormControl;
  results = [];

  constructor(private toastr: ToastrService, private http: HttpClient) {
    this.searchControl = new FormControl("");
  }

  ngOnInit(): void {}

  async searchSubmit() {
    try {
      console.log();
      if (this.searchControl.value != undefined) {
        let params = new HttpParams();
        params = params.append("title", this.searchControl.value.toString());
        let res: any = await lastValueFrom(
          this.http.get(
            "https://why-donate-backend.herokuapp.com/authentication/imdb-search-result-by-title",
            { params: params }
          )
        );
        this.dataSource =res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async filterResults(val: string): Promise<string[]> {
    console.log(val);
    return val
      ? this.results.filter(
          (v: any) => v.toLowerCase().indexOf(val.toLowerCase()) === 0
        )
      : [];
  }
}
