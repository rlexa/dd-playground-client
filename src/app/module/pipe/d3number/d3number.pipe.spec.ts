import { D3numberPipe } from './d3number.pipe';

describe('D3numberPipe', () => {
  test('create an instance', () => {
    const pipe = new D3numberPipe();
    expect(pipe).toBeTruthy();
  });

  test('should not transform if no format provided', () => {
    const pipe = new D3numberPipe();
    expect(pipe.transform('123456')).toEqual('123456');
  });

  test('should transform if format provided', () => {
    const pipe = new D3numberPipe();
    expect(pipe.transform('12899', '.3s')).toEqual('12.9k');
  });

  test('should transform when in range', () => {
    const pipe = new D3numberPipe();
    expect(pipe.transform('12899', '.3s', '13000')).toEqual('12899');
    expect(pipe.transform('12899', '.3s', '12899')).toEqual('12.9k');
  });
});
