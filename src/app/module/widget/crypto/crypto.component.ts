import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {rxNext_} from 'dd-rxjs';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {cleanupRx} from 'src/app/util/cleanup-rx';
import {CryptoApiService} from '../../service/crypto-api';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoComponent implements OnDestroy, OnInit {
  constructor(private readonly api: CryptoApiService) {}

  readonly bitcoinAddress$ = new BehaviorSubject('1BoatSLRHtKNngkdXEeobR76b53LETtpyT');
  readonly anyData$ = new Subject();

  ngOnDestroy() {
    cleanupRx(this.anyData$, this.bitcoinAddress$);
  }
  ngOnInit() {}

  apiBlockchainBitcoinAddress = () =>
    of(this.bitcoinAddress$.value || null)
      .pipe(switchMap((_) => this.api.blockchainSingleAddress$({address: _})))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  apiBlockCypherBitcoinAddress = () =>
    of(this.bitcoinAddress$.value || null)
      .pipe(switchMap((_) => this.api.blockcypherSingleAddress$({address: _})))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  apiWebBitcoinStats = () =>
    of(this.bitcoinAddress$.value || null)
      .pipe(switchMap((_) => this.api.webbitcoinStats$()))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  wsBlockchainPing = () =>
    of(null)
      .pipe(switchMap((_) => this.api.wsBlockchainPing$()))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  wsBlockchainAddressLatestTransaction = () =>
    of(this.bitcoinAddress$.value || null)
      .pipe(switchMap((_) => this.api.wsBlockchainAddressLatestTransaction$(_)))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  wsBlockCypherPing = () =>
    of(null)
      .pipe(switchMap((_) => this.api.wsBlockCypherPing$()))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  wsBlockCypherAddressConfirmedTx = () =>
    of(this.bitcoinAddress$.value || null)
      .pipe(switchMap((_) => this.api.wsBlockCypherAddressConfirmedTx$(_)))
      .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));
}
