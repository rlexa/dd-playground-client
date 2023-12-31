import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, OnDestroy, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {RxCleanup, rxNext_} from 'dd-rxjs';
import {BehaviorSubject, Subject, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CryptoApiService} from '../../service/crypto-api';
import {SimpleViewComponent} from '../../widget/simple-view';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    SimpleViewComponent,
  ],
})
export class CryptoComponent implements OnDestroy {
  private readonly api = inject(CryptoApiService);

  @RxCleanup() readonly bitcoinAddress$ = new BehaviorSubject('1BoatSLRHtKNngkdXEeobR76b53LETtpyT');
  @RxCleanup() readonly anyData$ = new Subject();

  destroy() {}
  ngOnDestroy() {
    this.destroy();
  }

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
