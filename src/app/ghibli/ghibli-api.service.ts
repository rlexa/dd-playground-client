import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cleanParams, getJsonHeaders } from 'app/util-http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GhibliApiService {
  constructor(private readonly http: HttpClient, ) { }

  private readonly API = 'https://ghibliapi.herokuapp.com';

  film$ = (id: string) => this.httpGetRest$({ url: `/films/${id}` }).pipe(map(_ => _));
  films$ = () => this.httpGetRest$({ url: `/films` }).pipe(map(_ => _));
  location$ = (id: string) => this.httpGetRest$({ url: `/locations/${id}` }).pipe(map(_ => _));
  locations$ = () => this.httpGetRest$({ url: `/locations` }).pipe(map(_ => _));
  person$ = (id: string) => this.httpGetRest$({ url: `/people/${id}` }).pipe(map(_ => _));
  persons$ = () => this.httpGetRest$({ url: `/people` }).pipe(map(_ => _));
  species$ = (id: string) => this.httpGetRest$({ url: `/species/${id}` }).pipe(map(_ => _));
  speciess$ = () => this.httpGetRest$({ url: `/species` }).pipe(map(_ => _));
  vehicle$ = (id: string) => this.httpGetRest$({ url: `/vehicles/${id}` }).pipe(map(_ => _));
  vehicles$ = () => this.httpGetRest$({ url: `/vehicles` }).pipe(map(_ => _));

  private httpGetRest$ = (val: { api?: string, url: string, params?: any }) => this.http
    .get((val.api || this.API) + val.url, { headers: getJsonHeaders(), params: cleanParams(val.params) });
}
