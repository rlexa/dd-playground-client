import { inject } from '@angular/core/testing';
import { EqvalueSubject } from './EqvalueSubject';

describe('EqvalueSubject', () => {
  test('amortize values', inject([], () => {
    const values = [];
    const es = new EqvalueSubject(0);
    es.subscribe(ii => values.push(ii));
    es.next(1);
    es.next(1);
    es.next(2);
    es.next(2);
    expect(values).toEqual([0, 1, 2]);
  }));
});
