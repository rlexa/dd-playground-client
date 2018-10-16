import { HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { isArray } from 'util';

export class HackQueryEncoder extends HttpUrlEncodingCodec {
  encodeKey(value: string) { return super.encodeKey(value).replace(/\+/gi, '%2B'); }
  encodeValue(value: string) { return super.encodeValue(value).replace(/\+/gi, '%2B'); }
}

/** Does encodeURIComponent to get percent-encoded UTF-8, convert that to raw bytes, feed that into btoa. */
export const b64EncodeUnicode = (value: string) => btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g,
  (match, p1) => String.fromCharCode(parseInt('0x' + p1, 16))
));

/** Going backwards: from bytestream, to percent-encoding, to original string. */
export const b64DecodeUnicode = (value: string) => decodeURIComponent(atob(value)
  .split('')
  .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
  .join(''));

export const cleanParams = (params?: any) => Object
  .entries(params || {})
  .filter(([key, value]) => value !== undefined && value !== null && value !== '' && (!isArray(value) || value['length'] > 0))
  .reduce((acc, [key, value]) => acc.append(key, value.toString()), new HttpParams({ encoder: new HackQueryEncoder() }));

export const getHeaders = (auth?: string, contentType?: string) => {
  let ret = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('content-type', contentType || 'text/plain;charset=utf-8');
  if (auth) {
    ret = ret.set('authorization', auth || '');
  }
  return ret;
}

export const getJsonHeaders = (auth?: string) => getHeaders(auth, 'application/json').set('accept', 'application/json');

export const HttpCode = {
  BadRequest: 400,
  InternalServerError: 500,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Ok: 200
};

export function httpErrorToString(err) {
  let ret: string = null;
  if (err) {
    switch (err.status) {
      case HttpCode.BadRequest: ret = 'Bad Request'; break;
      case HttpCode.Forbidden: ret = 'Forbidden'; break;
      case HttpCode.GatewayTimeout: ret = 'Gateway Timeout'; break;
      case HttpCode.InternalServerError: ret = 'Internal Server Error'; break;
      case HttpCode.NotFound: ret = 'Not Found'; break;
      case HttpCode.ServiceUnavailable: ret = 'Service Unavailable'; break;
      case HttpCode.Unauthorized: ret = 'Unauthorized'; break;
    }
  }
  return ret;
}

export const toFormUrlencoded = val => Object
  .entries(val || {})
  .filter(([key, value]) => !!key && value !== null && value !== undefined)
  .map(([key, value]) => encodeURI(key) + '=' + encodeURI(value.toString()))
  .join('&');
