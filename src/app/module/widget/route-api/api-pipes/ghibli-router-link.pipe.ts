import {Pipe, PipeTransform} from '@angular/core';
import {AppRoute} from 'src/app/app-route';
import {DashboardRoute} from '../../dashboard/dashboard-route';
import {ApiRoute} from '../api-route';

enum RemoteType {
  Movie = 'films',
  Person = 'people',
  Species = 'species',
}

const remoteTypeRoute: Record<RemoteType, ApiRoute> = {
  [RemoteType.Movie]: ApiRoute.Movie,
  [RemoteType.Person]: ApiRoute.Person,
  [RemoteType.Species]: ApiRoute.Species,
};

@Pipe({name: 'ghibliRouteLink', pure: true})
export class GhibliRouteLinkPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const [id, remoteType] = String(value).split('/').reverse();
    if (id?.length && Object.values(RemoteType).includes(remoteType as RemoteType)) {
      return `/${AppRoute.Dashboard}/${DashboardRoute.Api}/${remoteTypeRoute[remoteType as RemoteType]}/${id}`;
    }
    return null;
  }
}
