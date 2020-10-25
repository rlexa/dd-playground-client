import {FlatPipe} from './flat.pipe';

describe('FlatPipe', () => {
  it('create an instance', () => {
    const pipe = new FlatPipe();
    expect(pipe).toBeTruthy();
  });

  it('flattes', () => {
    expect(new FlatPipe().transform([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });
});
