export type funcMap<T> = (from: any, to: T) => T;

export const EMAIL_REGEXP_VALUE =
  `[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*` +
  '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
export const EMAIL_REGEXP = new RegExp(EMAIL_REGEXP_VALUE);

export const WEB_REGEXP_VALUE =
  '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}' +
  '|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9].[^s]{2,})';
export const WEB_REGEXP = new RegExp(WEB_REGEXP_VALUE);

export const arrayFrom = (len: number) => Array.from(Array(Math.max(len || 0, 0)).keys());

export function calcElementHeight(element: HTMLElement) {
  let ret = 0;
  if (element) {
    const style = !window || !window.getComputedStyle ? (element as any).currentStyle : window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    ret =
      (rect ? rect.height : element.offsetHeight) +
      [style.marginTop, style.marginBottom, style.borderTopWidth, style.borderBottomWidth]
        .map((ii) => parseInt(ii, 10))
        .reduce((acc, ii) => acc + (isNaN(ii) ? 0 : ii), 0);
  }
  return ret;
}

export function clearUiSelection() {
  if (self && self.getSelection) {
    const sel = self.getSelection();
    if (sel) {
      sel.removeAllRanges();
    }
  }
}

export const copyJson = <T extends any>(source: T) => JSON.parse(JSON.stringify(source)) as T;

export const hash = (value: string): number => {
  let ret = 0;
  if (value && value.length) {
    for (let ii = 0; ii < value.length; ++ii) {
      ret = (ret << 5) - ret + value.charCodeAt(ii);
      ret |= 0; // Convert to 32bit integer
    }
  }
  return ret;
};

export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

export const isEqualValue = <T>(aa: T, bb: T) => JSON.stringify(aa) === JSON.stringify(bb);

export const JIRATASK_REGEXP_VALUE = '^[a-zA-Z0-9]{3}-[0-9]{1}[0-9]*$';
export const JIRATASK_REGEXP = new RegExp(JIRATASK_REGEXP_VALUE);

export const isJiraTask = (value: string) => JIRATASK_REGEXP.test(value);
export const isNumeric = (value: string) =>
  typeof value === 'string' &&
  (isJiraTask(value) ||
    (!isNaN(parseFloat(value)) && value.length - parseFloat(value).toString().length < 4) ||
    !isNaN(parseFloat(value.split('.').join(''))));
export const isObject = (value: any) => typeof value === 'object' && !!value;
export const isWeb = (value: any) => WEB_REGEXP.test(value);

export function mapArray<T>(from: object, to: T[], map: funcMap<T>): T[] {
  if (!map || (!from && typeof from !== 'boolean') || !Array.isArray(to)) {
    return to;
  }
  if (Array.isArray(from)) {
    for (const ii of from) {
      to.push(map(ii, {} as T));
    }
  } else {
    to.push(map(from, {} as T));
  }
  return to;
}

export const MS_SECOND = 1000;
export const MS_MINUTE = MS_SECOND * 60;
export const MS_HOUR = MS_MINUTE * 60;
export const MS_DAY = MS_HOUR * 24;
export const MS_WEEK = MS_DAY * 7;

export const parseBoolean = (from?: any) => ('' + from).toLowerCase() === 'true';

export const parseString = (from?: any, to?: any) => (typeof from === 'undefined' || from === null ? null : from.toString()) as string;

export function parseDate(from?: any) {
  let ret: Date = null;
  const val = parseString(from);
  if (val) {
    ret = new Date(val);
    if (isNaN(ret.getTime()) && val.length === '0000-00-00+00:00'.length) {
      ret = new Date(val.slice(0, '0000-00-00'.length));
    }
  }
  return ret;
}

export const parseFloating = (from?: any) => parseFloat('' + from);
export const parseInteger = (from?: any) => parseInt('' + from, 10);

export const TELEPHONE_AREA_REGEXP_VALUE = '^[0-9]{1,}$';
export const TELEPHONE_COUNTRY_REGEXP_VALUE = '^[+]*[0-9]{1,}[-]{0,1}[0-9]*$';
export const TELEPHONE_DIRECT_REGEXP_VALUE = '^[0-9]{1,}$';
export const TELEPHONE_REGEXP_VALUE = '^[0-9]{1,}$';

export const toDate = (value: any) => (value ? (value instanceof Date ? value : new Date(value.toString())) : null);
export const toMax = <V extends any>(value: V[]) => (value || []).reduce((acc, val) => (val > acc ? val : acc), undefined as V);
export const toMin = <V extends any>(value: V[]) => (value || []).reduce((acc, val) => (val < acc ? val : acc), undefined as V);

export const toRange = (count: number, optTo?: number) =>
  Array.from(Array(optTo ? optTo - count : count || 0), (ii, jj) => jj + (optTo ? count : 0));

export const toWebAddress = (value: string) => (('' + value).startsWith('http') ? value : 'http://' + value);

export const trackByIndex = (index: number, _: any) => index;
