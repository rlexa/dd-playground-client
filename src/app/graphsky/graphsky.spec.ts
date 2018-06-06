import { inject } from '@angular/core/testing';
import { finalize } from 'rxjs/operators';
import { Graphsky, GraphskyQuery } from './graphsky';

const TEST_TAG_NAME = 'name';
const TEST_TAG_NAME_VALS = ['Alice', 'Bob', 'Clark'];
const TEST_DATA = [
  { [TEST_TAG_NAME]: TEST_TAG_NAME_VALS[0] },
  { [TEST_TAG_NAME]: TEST_TAG_NAME_VALS[1] },
  { [TEST_TAG_NAME]: TEST_TAG_NAME_VALS[2] },
];

describe('Graphsky', () => {

  test('create-destroy', inject([], () => {
    const db = new Graphsky();
    const func = 'func';
    const spy = { [func]: () => { } };
    spyOn(spy, func);
    db.change$.pipe(finalize(spy[func])).subscribe();
    expect(spy[func]).not.toHaveBeenCalled();
    db.destroy();
    expect(spy[func]).toHaveBeenCalled();
  }));

  test('add valid', inject([], () => {
    const db = new Graphsky();
    expect(db.nodeCount$.value).toBe(0);
    db.add(TEST_DATA);
    expect(db.nodeCount$.value).toBe(TEST_DATA.length);
    db.destroy();
  }));

  test('query all', inject([], () => {
    const db = new Graphsky();
    db.add(TEST_DATA);
    expect(db.query(new GraphskyQuery().alias('q'))['q'].count).toBe(TEST_DATA.length);
    db.destroy();
  }));

  test('query value', inject([], () => {
    const db = new Graphsky();
    db.add(TEST_DATA);
    const result = db.query(new GraphskyQuery().alias('q').match(ii => ii[TEST_TAG_NAME] === TEST_TAG_NAME_VALS[0]))['q'];
    expect(result.nodes.map(ii => ii.data)).toEqual(TEST_DATA.filter(ii => ii[TEST_TAG_NAME] === TEST_TAG_NAME_VALS[0]));
    db.destroy();
  }));

});
