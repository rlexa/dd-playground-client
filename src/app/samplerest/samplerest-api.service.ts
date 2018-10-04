import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cleanParams, getJsonHeaders } from 'app/util-http';
import { map } from 'rxjs/operators';

export interface RequestSkipTake { skip?: number, take?: number }

export interface RequestAddressItems extends RequestSkipTake { address: string }

@Injectable({ providedIn: 'root' })
export class SamplerestApiService {
  constructor(private readonly http: HttpClient, ) { }

  private readonly API = 'samplerest';

  users$ = () => this
    .httpGetRest$({ api: this.API, url: `/users` })
    .pipe(map(_ => _));

  private httpGetRest$ = (val: { api: string, url: string, params?: any }) => this.http
    .get(val.api + val.url, { headers: getJsonHeaders(), params: cleanParams(val.params) });
}
