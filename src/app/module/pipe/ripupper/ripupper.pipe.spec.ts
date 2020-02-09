import {RipupperPipe} from './ripupper.pipe';

describe('RipupperPipe', () => {
  let instance: RipupperPipe = null;

  beforeEach(() => (instance = new RipupperPipe()));

  test('create an instance', () => {
    expect(instance).toBeTruthy();
  });

  test('transform correctly', () => {
    Object.entries({
      keynamevalue: 'keynamevalue',
      Keynamevalue: 'Keynamevalue',
      keynameValue: 'keyname Value',
      keyNameValue: 'key Name Value',
      KeyNameValue: 'Key Name Value',
      keynameVAlue: 'keyname VAlue',
      'keyname Value': 'keyname Value',
      keyname_Value: 'keyname_Value',
      KEYNAMEVALUE: 'KEYNAMEVALUE',
    }).forEach(([key, val]) => expect(instance.transform(key)).toEqual(val));
  });
});
