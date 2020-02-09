import {StartuppercasePipe} from './startuppercase.pipe';

describe('StartuppercasePipe', () => {
  test('create an instance', () => {
    const pipe = new StartuppercasePipe();
    expect(pipe).toBeTruthy();
  });

  test('should start upper case', () => {
    const pipe = new StartuppercasePipe();
    expect(pipe.transform('hello!')).toEqual('Hello!');
  });
});
