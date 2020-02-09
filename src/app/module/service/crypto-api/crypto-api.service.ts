import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {cleanParams, getJsonHeaders} from 'src/app/util';
import {of} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {WebSocketSubject} from 'rxjs/webSocket';

class BlockchainWebSocketSubject extends WebSocketSubject<object> {
  ping = () => this.next({op: 'ping'});

  addressLatestTransaction = (address: string) => {
    this.next({op: 'addr_sub', addr: address});
    this.next({op: 'ping_tx'});
    this.next({op: 'addr_unsub', addr: address});
  };
}

class BlockCypherWebSocketSubject extends WebSocketSubject<object> {
  ping = () => this.next({event: 'ping'});

  addressConfirmedTx = (address: string) => this.next({event: 'confirmed-tx', address});
}

export interface RequestSkipTake {
  skip?: number;
  take?: number;
}
export interface RequestAddressItems extends RequestSkipTake {
  address: string;
}

@Injectable({providedIn: 'root'})
export class CryptoApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly API_BLOCKCHAIN = 'https://blockchain.info';
  private readonly API_BLOCKCYPHER = 'https://api.blockcypher.com/v1';
  private readonly API_WEBBITCOIN = 'http://webbtc.com';
  private readonly WS_BLOCKCHAIN = 'wss://ws.blockchain.info/inv';
  private readonly WS_BLOCKCYPHER = 'wss://socket.blockcypher.com/v1/btc/main';

  wsBlockchainPing$ = () =>
    of(this.wsBlockchain()).pipe(
      tap(_ => _.ping()),
      switchMap(_ => _),
      take(1),
    );
  wsBlockchainAddressLatestTransaction$ = (address: string) =>
    of(this.wsBlockchain()).pipe(
      tap(_ => _.addressLatestTransaction(address)),
      switchMap(_ => _),
      take(1),
    );

  wsBlockCypherPing$ = () =>
    of(this.wsBlockCypher()).pipe(
      tap(_ => _.ping()),
      switchMap(_ => _),
      take(1),
    );
  wsBlockCypherAddressConfirmedTx$ = (address: string) =>
    of(this.wsBlockCypher()).pipe(
      tap(_ => _.addressConfirmedTx(address)),
      switchMap(_ => _),
      take(1),
    );

  blockchainSingleAddress$ = (req: RequestAddressItems) =>
    this.httpGetRest$({
      api: this.API_BLOCKCHAIN,
      url: `/rawaddr/${req.address || 'null'}`,
      params: {limit: req.take, offset: req.skip, cors: true},
    }).pipe(map(_ => _));

  blockcypherSingleAddress$ = (req: RequestAddressItems) =>
    this.httpGetRest$({
      api: this.API_BLOCKCYPHER,
      url: `/btc/main/addrs/${req.address || 'null'}`,
      params: {limit: req.take, offset: req.skip},
    }).pipe(map(_ => _));

  webbitcoinStats$ = () => this.httpGetRest$({api: this.API_WEBBITCOIN, url: `/stats.json`}).pipe(map(_ => _));

  private httpGetRest$ = (val: {api: string; url: string; params?: any}) =>
    this.http.get(val.api + val.url, {headers: getJsonHeaders(), params: cleanParams(val.params)});

  private wsBlockchain = () => new BlockchainWebSocketSubject(this.WS_BLOCKCHAIN);
  private wsBlockCypher = () => new BlockCypherWebSocketSubject(this.WS_BLOCKCYPHER);
}
