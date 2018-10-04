import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CryptoApiService } from 'app/crypto';
import { DoneSubject, rxComplete, rxNext_ } from 'app/rx';
import { SamplerestApiService } from 'app/samplerest';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoComponent implements OnDestroy {
  constructor(
    private readonly apiCrypto: CryptoApiService,
    private readonly apiSamplerest: SamplerestApiService,
  ) { }

  private readonly done$ = new DoneSubject();

  readonly bitcoinAddress$ = new BehaviorSubject('1BoatSLRHtKNngkdXEeobR76b53LETtpyT');

  readonly anyData$ = new Subject();

  ngOnDestroy() {
    this.done$.done();
    rxComplete(this.anyData$, this.bitcoinAddress$);
  }

  requestBitcoinAddress = () => of(this.bitcoinAddress$.value || null)
    .pipe(switchMap(_ => this.apiCrypto.bitcoinTransactions$({ address: _ })))
    .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));

  requestSamplerestUsers = () => of(null)
    .pipe(switchMap(_ => this.apiSamplerest.users$()))
    .subscribe(rxNext_(this.anyData$), rxNext_(this.anyData$));
}
