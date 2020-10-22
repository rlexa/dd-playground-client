import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

export interface WithId {
  id?: string;
}

export interface GhibliLocation extends WithId {
  climate?: string;
  films?: string[];
  name?: string;
  residents?: string[];
  surface_water?: string;
  terrain?: string;
  url?: string[];
}

export interface GhibliMovie extends WithId {
  description?: string;
  director?: string;
  locations?: string[];
  people?: string[];
  producer?: string;
  release_date?: string;
  rt_score?: string;
  species?: string[];
  title?: string;
  url?: string;
  vehicles?: string[];
}

export interface GhibliPerson extends WithId {
  age?: string;
  eye_color?: string;
  films?: string[];
  gender?: string;
  hair_color?: string;
  name?: string;
  species?: string;
  url?: string;
}

export interface GhibliSpecies extends WithId {
  classification?: string;
  eye_colors?: string;
  films?: string[];
  hair_colors?: string;
  name?: string;
  people?: string[];
  url?: string;
}

export interface GhibliVehicle extends WithId {
  description?: string;
  films?: string;
  length?: string;
  name?: string;
  pilot?: string;
  url?: string;
  vehicle_class?: string;
}

@Injectable({providedIn: 'root'})
export class ApiGhibliService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly API = `https://ghibliapi.herokuapp.com`;

  private removeApiPrefix = (val: unknown) => (typeof val === 'string' && val.startsWith(this.API) ? val.substr(this.API.length) : val);

  private sanitizeApiPrefix<T>(item: T) {
    Object.entries(item || {}).forEach(([key, val]) =>
      typeof val === 'string'
        ? (item[key] = this.removeApiPrefix(val))
        : Array.isArray(val)
        ? (item[key] = val.map(this.removeApiPrefix))
        : typeof val === 'object'
        ? (item[key] = this.sanitizeApiPrefix(val))
        : {},
    );
    return item;
  }

  location$ = (id: string) =>
    this.httpClient.get<GhibliLocation>(`${this.API}/locations/${id}`).pipe(map((ii) => this.sanitizeApiPrefix(ii)));

  locations$ = () =>
    this.httpClient.get<GhibliLocation[]>(`${this.API}/locations`).pipe(map((iis) => iis.map((ii) => this.sanitizeApiPrefix(ii))));

  movie$ = (id: string) => this.httpClient.get<GhibliMovie>(`${this.API}/films/${id}`).pipe(map((ii) => this.sanitizeApiPrefix(ii)));

  movies$ = () => this.httpClient.get<GhibliMovie[]>(`${this.API}/films`).pipe(map((iis) => iis.map((ii) => this.sanitizeApiPrefix(ii))));

  person$ = (id: string) => this.httpClient.get<GhibliPerson>(`${this.API}/people/${id}`).pipe(map((ii) => this.sanitizeApiPrefix(ii)));

  persons$ = () =>
    this.httpClient.get<GhibliPerson[]>(`${this.API}/people`).pipe(map((iis) => iis.map((ii) => this.sanitizeApiPrefix(ii))));

  species$ = (id: string) => this.httpClient.get<GhibliSpecies>(`${this.API}/species/${id}`).pipe(map((ii) => this.sanitizeApiPrefix(ii)));

  speciess$ = () =>
    this.httpClient.get<GhibliSpecies[]>(`${this.API}/species`).pipe(map((iis) => iis.map((ii) => this.sanitizeApiPrefix(ii))));

  vehicle$ = (id: string) => this.httpClient.get<GhibliVehicle>(`${this.API}/vehicles/${id}`).pipe(map((ii) => this.sanitizeApiPrefix(ii)));

  vehicles$ = () =>
    this.httpClient.get<GhibliVehicle[]>(`${this.API}/vehicles`).pipe(map((iis) => iis.map((ii) => this.sanitizeApiPrefix(ii))));
}
