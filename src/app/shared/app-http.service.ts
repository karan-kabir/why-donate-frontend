import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { last, startWith } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AppHttpService {
  private _headers: any;

  constructor(private http: HttpClient) {
    // if (environment.base_url.endsWith("/")) {
    //   throw new Error(
    //     `URL does not need to end with '/', currently ${environment.base_url}`
    //   );
    // }
  }

  public getHeaders() {
    return this._headers;
  }

  public setAuthHeader(token: string) {
    this._headers = {
      "Authorization":`Bearer ${token}`
    };
  }

  public async get<T>(
    url: string,
    query: HttpParams ,
    base_url = null
  ): Promise<T> {
    let options = {
      headers: this._headers,
    };
    if (!url.startsWith("/")) {
      throw new Error(`URL needs to start with '/', currently ${url}`);
    }
    if (query !== null) {
      options.headers.params = query;
    }
    let burl = base_url === null ? environment.base_url : base_url;
    let curl = `${burl}${url}`;
    return await lastValueFrom(this.http.get<T>(curl, options).pipe(last()));
  }

  public async post<T, G>(
    url: string,
    body: G,
    base_url = null
  ): Promise<T> {
    let options = {
      headers: this._headers,
    };
    if (!url.startsWith("/")) {
      throw new Error(`URL needs to start with '/', currently ${url}`);
    }
    let burl = base_url === null ? environment.base_url : base_url;
    let curl = `${burl}${url}`;
    return await lastValueFrom(this.http
     .post<T>(curl, body, options)
     .pipe(last()));
  }

}
