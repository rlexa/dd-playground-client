import { RipupperPipe } from './ripupper.pipe';

describe('RipupperPipe', () => {
  test('create an instance', () => {
    const pipe = new RipupperPipe();
    expect(pipe).toBeTruthy();
  });

  test('transform correctly', () => {
    const pipe = new RipupperPipe();
    expect(pipe.transform('keynamevalue')).toEqual('keynamevalue');
    expect(pipe.transform('Keynamevalue')).toEqual('Keynamevalue');
    expect(pipe.transform('keynameValue')).toEqual('keyname Value');
    expect(pipe.transform('keyNameValue')).toEqual('key Name Value');
    expect(pipe.transform('KeyNameValue')).toEqual('Key Name Value');
    expect(pipe.transform('keynameVAlue')).toEqual('keyname VAlue');
    expect(pipe.transform('keyname Value')).toEqual('keyname Value');
    expect(pipe.transform('keyname_Value')).toEqual('keyname_Value');
    expect(pipe.transform('KEYNAMEVALUE')).toEqual('KEYNAMEVALUE');
  });
});
