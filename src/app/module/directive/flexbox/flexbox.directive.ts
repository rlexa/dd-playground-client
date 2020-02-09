import { Directive, HostBinding, Input } from '@angular/core';

interface Value { value: string; }

function consume(where: Value, what: string) {
  let ii = -1;
  if (where && typeof where.value === 'string' && where.value && typeof what === 'string' && what) {
    ii = where.value.indexOf(what);
    if (ii >= 0) {
      where.value = where.value.substr(0, ii) + where.value.substr(ii + what.length, where.value.length);
    }
  }
  return ii >= 0;
}

const parse = (from: Value, map: { [key: string]: string }, defaultValue: string) => Object
  .keys(map)
  .reduce((acc, key) => !acc && consume(from, key) ? map[key] : acc, '')
  || defaultValue;

@Directive({ selector: '[ddFlexbox], [ddFlexitem]' })
export class FlexboxDirective {

  private readonly mapJustifyContent = {
    'xs': 'flex-start',
    'xc': 'center',
    'xe': 'flex-end',
    'xb': 'space-between',
    'xa': 'space-around'
  };

  private readonly mapAlignItems = {
    'ys': 'flex-start',
    'yc': 'center',
    'ye': 'flex-end',
    'yb': 'baseline',
    'yt': 'stretch'
  };

  private readonly mapAlignContent = {
    'cs': 'flex-start',
    'cc': 'center',
    'ce': 'flex-end',
    'cb': 'space-between',
    'ca': 'space-around',
    'ct': 'stretch'
  };

  private readonly mapAlignSelf = {
    'as': 'flex-start',
    'ac': 'center',
    'ae': 'flex-end',
    'ab': 'baseline',
    'at': 'stretch',
    'aa': 'auto'
  };

  @HostBinding('style.display') styleDisplay: string;
  @HostBinding('style.flexDirection') styleFlexDirection: string;
  @HostBinding('style.justifyContent') styleJustifyContent: string;
  @HostBinding('style.alignItems') styleAlignItems: string;
  @HostBinding('style.alignContent') styleAlignContent: string;
  @HostBinding('style.flexWrap') styleFlexWrap: string;

  @HostBinding('style.alignSelf') styleAlignSelf: string;
  @HostBinding('style.flex') styleFlex: string;

  @Input() set ddFlexbox(value: string) {
    const val = <Value>{ value: value ? value.toString().toLowerCase() : '' };

    this.styleDisplay = 'flex';
    this.styleFlexWrap = consume(val, 'w') ? 'wrap' : 'no-wrap';

    consume(val, 'h');
    const flexDir = consume(val, 'v') ? 'column' : 'row';
    this.styleFlexDirection = flexDir + (consume(val, 'r') ? '-reverse' : '');

    this.styleJustifyContent = parse(val, this.mapJustifyContent, 'flex-start');
    this.styleAlignItems = parse(val, this.mapAlignItems, 'stretch');
    this.styleAlignContent = parse(val, this.mapAlignContent, 'stretch');

    val.value = val.value.trim();
    if (val.value.length && console && console.warn) {
      console.warn('ddFlexbox - invalid value: "' + val.value + '"');
    }
  }

  @Input() set ddFlexitem(value: string) {
    const val = <Value>{ value: value ? value.toString().toLowerCase() : '' };

    this.styleAlignSelf = parse(val, this.mapAlignSelf, 'auto');

    val.value = val.value.trim();
    const vals = val.value.length ? val.value.split(' ') : [];
    if (vals.length === 2) {
      this.styleFlex = [...vals, 'auto'].join(' ');
    } else if (vals.length === 3) {
      this.styleFlex = vals.join(' ');
    } else {
      this.styleFlex = '0 1 auto';
      if (vals.length !== 0 && console && console.warn) {
        console.warn('ddFlexitem - fallback to "' + this.styleFlex + '" due to invalid flex value: "' + val.value + '"');
      }
    }
  }

}
