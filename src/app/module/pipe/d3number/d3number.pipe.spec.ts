const mockD3 = {format: jest.fn(() => 'ok')};
jest.doMock('d3', () => {
  const ret = () => mockD3;
  return ret;
});

import {D3numberPipe} from './d3number.pipe';

describe('D3numberPipe', () => {
  test('create an instance', () => {
    const pipe = new D3numberPipe();
    expect(pipe).toBeTruthy();
  });
});
