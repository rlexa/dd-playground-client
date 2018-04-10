import { UppercasePipe } from './uppercase.pipe';

describe('UppercasePipe', () => {
  test('create an instance', () => {
    const pipe = new UppercasePipe();
    expect(pipe).toBeTruthy();
  });

  test('should start upper case', () => {
    const pipe = new UppercasePipe();
    expect(pipe.transform('hello!')).toEqual('Hello!');
  });
});
