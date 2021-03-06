import {inject} from '@angular/core/testing';
import {hash, isEqualValue, isJiraTask, isNumeric, isObject, mapArray, toRange} from './util';

describe('Util', () => {
  test('hash', inject([], () => {
    expect(typeof hash('hash1')).toBe('number');
    expect(typeof hash('hash2')).toBe('number');
    expect(hash('hash1')).not.toBe(hash('hash2'));
  }));

  test('detect jiratask', inject([], () => {
    ['asd', ''].forEach(ii => expect(isJiraTask(ii)).toBe(false));
    expect(isJiraTask('JUM-123')).toBe(true);
  }));

  [null, undefined, '', 'asd3.3'].forEach(ii =>
    test(
      'detect not-numeric "' + JSON.stringify(ii) + '"',
      inject([], () => expect(isNumeric(ii)).toBe(false)),
    ),
  );
  ['3', '3.3', '-3'].forEach(ii =>
    test(
      'detect numeric "' + JSON.stringify(ii) + '"',
      inject([], () => expect(isNumeric(ii)).toBe(true)),
    ),
  );

  [null, undefined, '', 3.3, true].forEach(ii =>
    test(
      'detect not-object "' + JSON.stringify(ii) + '"',
      inject([], () => expect(isObject(ii)).toBe(false)),
    ),
  );
  [{}, []].forEach(ii =>
    test(
      'detect object "' + JSON.stringify(ii) + '"',
      inject([], () => expect(isObject(ii)).toBe(true)),
    ),
  );

  test('map array', inject([], () => {
    const mappy = (from: any, to: any) => ({...to, ...{to: from.from}});
    expect(mapArray(null, [], mappy)).toEqual([]);
    expect(mapArray({from: 3}, [], mappy)).toEqual([{to: 3}]);
    expect(mapArray([{from: 2}, {from: 3}], [], mappy)).toEqual([{to: 2}, {to: 3}]);
  }));

  test('toRange', inject([], () => {
    expect(toRange(0)).toEqual([]);
    expect(toRange(1)).toEqual([0]);
    expect(toRange(3)).toEqual([0, 1, 2]);
    expect(toRange(0, 1)).toEqual([0]);
    expect(toRange(0, 3)).toEqual([0, 1, 2]);
    expect(toRange(3, 6)).toEqual([3, 4, 5]);
  }));

  test('isEqualValue', inject([], () => {
    expect(isEqualValue(1, 1)).toEqual(true);
    expect(isEqualValue(1, 2)).toEqual(false);
    expect(isEqualValue({}, {})).toEqual(true);
    expect(isEqualValue({a: 1}, {})).toEqual(false);
    expect(isEqualValue({a: 1}, {a: 1})).toEqual(true);
    expect(isEqualValue([], [])).toEqual(true);
    expect(isEqualValue([1], [])).toEqual(false);
    expect(isEqualValue([1], [1])).toEqual(true);
  }));
});
