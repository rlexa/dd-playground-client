import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cleanParams, getJsonHeaders } from 'app/util-http';
import { map } from 'rxjs/operators';

export interface RequestSkipTake { skip?: number, take?: number }

export interface RequestAddressItems extends RequestSkipTake { address: string }

@Injectable({ providedIn: 'root' })
export class CryptoApiService {
  constructor(private readonly http: HttpClient, ) { }

  private readonly API_BLOCKCHAIN_1 = 'bc1';

  bitcoinTransactions$ = (req: RequestAddressItems) => this
    .httpGetRest$({ api: this.API_BLOCKCHAIN_1, url: `/rawaddr/${req.address || 'null'}`, params: { limit: req.take, offset: req.skip, cors: true } })
    .pipe(map(_ => _));

  private httpGetRest$ = (val: { api: string, url: string, params?: any, auth?: string }) => this.http
    .get(val.api + val.url, { headers: getJsonHeaders(val.auth), withCredentials: true, params: cleanParams(val.params) });
}
