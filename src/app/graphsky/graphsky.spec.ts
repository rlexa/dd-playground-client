import { inject } from '@angular/core/testing';
import { finalize } from 'rxjs/operators';
import { Graphsky } from './graphsky';

const TAG_NAME = 'name';
const TAG_NAME_VALS = ['Alice', 'Bob', 'Clark'];
const NODES = [
  { [TAG_NAME]: TAG_NAME_VALS[0] },
  { [TAG_NAME]: TAG_NAME_VALS[1] },
  { [TAG_NAME]: TAG_NAME_VALS[2] },
];

const TAG_FEEL = 'feel';
const TAG_FEEL_VALS = ['likes', 'hates'];
const LINKS = [
  { from: NODES[0], to: NODES[1], data: { [TAG_FEEL]: TAG_FEEL_VALS[0] } },
  { from: NODES[0], to: NODES[2], data: { [TAG_FEEL]: TAG_FEEL_VALS[1] } },
  { from: NODES[1], to: NODES[2], data: { [TAG_FEEL]: TAG_FEEL_VALS[0] } },
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
    db.add(NODES);
    db.link(LINKS);
    expect(db.nodeCount$.value).toBe(NODES.length);
    db.destroy();
  }));

  test('query all count', inject([], () => {
    const db = new Graphsky();
    db.add(NODES);
    db.link(LINKS);
    expect(db.query((nodes, links) => [nodes.length, links.length])).toEqual([NODES.length, LINKS.length]);
    db.destroy();
  }));

  test('query node value', inject([], () => {
    const db = new Graphsky();
    db.add(NODES);
    db.link(LINKS);
    expect(db.query((nodes) => nodes.filter(ii => ii.data[TAG_NAME] === TAG_NAME_VALS[0])).length).toEqual(1);
    db.destroy();
  }));

  test('query link value', inject([], () => {
    const db = new Graphsky();
    db.add(NODES);
    db.link(LINKS);
    expect(db.query((nodes, links) => links.filter(ii => ii.data[TAG_FEEL] === TAG_FEEL_VALS[0])).length).toEqual(2);
    db.destroy();
  }));

});
