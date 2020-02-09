import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {cleanParams, getJsonHeaders} from 'src/app/util';
import {map} from 'rxjs/operators';

const API = 'https://ghibliapi.herokuapp.com';

export const GHIBLI_TYPE_FILM = '/films/';
export const GHIBLI_TYPE_LOCATION = '/locations/';
export const GHIBLI_TYPE_PEOPLE = '/people/';
export const GHIBLI_TYPE_SPECIES = '/species/';
export const GHIBLI_TYPE_VEHICLES = '/vehicles/';
export const GHIBLI_TYPES = [GHIBLI_TYPE_FILM, GHIBLI_TYPE_LOCATION, GHIBLI_TYPE_PEOPLE, GHIBLI_TYPE_SPECIES, GHIBLI_TYPE_VEHICLES];

export interface GhibliEntity {
  id: string;
  ghibliType: string;
}

const removeApiPrefix = (val: unknown) => (typeof val === 'string' && val.startsWith(API) ? val.substr(API.length) : val);

const sanitizeApiPrefix = (item: GhibliEntity) =>
  Object.entries(item || {}).forEach(([key, val]) =>
    typeof val === 'string'
      ? (item[key] = removeApiPrefix(val))
      : Array.isArray(val)
      ? (item[key] = val.map(removeApiPrefix))
      : typeof val === 'object'
      ? (item[key] = sanitizeApiPrefix(val))
      : {},
  );

const mapGhibliEntity = (from: any) => {
  const url = Array.isArray(from.url) ? from.url[0] : from.url;
  const ret: GhibliEntity = {...(from || {})};
  ret.ghibliType = typeof url === 'string' ? GHIBLI_TYPES.find(_ => url.includes(_)) : '';
  ret.id = ret.ghibliType + ret.id;

  sanitizeApiPrefix(ret);

  return ret;
};

@Injectable({providedIn: 'root'})
export class GhibliApiService {
  constructor(private readonly http: HttpClient) {}

  private readonly API = API;

  film$ = (id: string) => this.httpGetRest$({url: `/films/${id}`}).pipe(map(mapGhibliEntity));
  films$ = () => this.httpGetRest$({url: `/films`}).pipe(map((_: object[]) => _.map(mapGhibliEntity)));
  location$ = (id: string) => this.httpGetRest$({url: `/locations/${id}`}).pipe(map(mapGhibliEntity));
  locations$ = () => this.httpGetRest$({url: `/locations`}).pipe(map((_: object[]) => _.map(mapGhibliEntity)));
  person$ = (id: string) => this.httpGetRest$({url: `/people/${id}`}).pipe(map(mapGhibliEntity));
  persons$ = () => this.httpGetRest$({url: `/people`}).pipe(map((_: object[]) => _.map(mapGhibliEntity)));
  species$ = (id: string) => this.httpGetRest$({url: `/species/${id}`}).pipe(map(mapGhibliEntity));
  speciess$ = () => this.httpGetRest$({url: `/species`}).pipe(map((_: object[]) => _.map(mapGhibliEntity)));
  vehicle$ = (id: string) => this.httpGetRest$({url: `/vehicles/${id}`}).pipe(map(mapGhibliEntity));
  vehicles$ = () => this.httpGetRest$({url: `/vehicles`}).pipe(map((_: object[]) => _.map(mapGhibliEntity)));

  private httpGetRest$ = (val: {api?: string; url: string; params?: any}) =>
    this.http.get((val.api || this.API) + val.url, {headers: getJsonHeaders(), params: cleanParams(val.params)});
}
