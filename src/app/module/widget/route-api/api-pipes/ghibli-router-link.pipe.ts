import {Pipe, PipeTransform} from '@angular/core';
import {AppRoute} from 'src/app/app-route';
import {DashboardRoute} from '../../dashboard/dashboard-route';
import {ApiRoute, apiRouteIcon, apiRouteTooltip} from '../api-route';

enum RemoteType {
  Location = 'locations',
  Movie = 'films',
  Person = 'people',
  Species = 'species',
  Vehicle = 'vehicles',
}

const remoteTypeRoute: Record<RemoteType, ApiRoute> = {
  [RemoteType.Location]: ApiRoute.Location,
  [RemoteType.Movie]: ApiRoute.Movie,
  [RemoteType.Person]: ApiRoute.Person,
  [RemoteType.Species]: ApiRoute.Species,
  [RemoteType.Vehicle]: ApiRoute.Vehicle,
};

@Pipe({name: 'ghibliRouteLink', pure: true})
export class GhibliRouteLinkPipe implements PipeTransform {
  transform(value: any, context: string, ...args: any[]) {
    const [id, remoteType] = String(value).split('/').reverse();
    if (id?.length && Object.values(RemoteType).includes(remoteType as RemoteType)) {
      const apiRoute = remoteTypeRoute[remoteType as RemoteType];
      return context === 'icon'
        ? apiRouteIcon[apiRoute]
        : context === 'tooltip'
        ? apiRouteTooltip[apiRoute]
        : `/${AppRoute.Dashboard}/${DashboardRoute.Api}/${apiRoute}/${id}`;
    }
    return context === 'icon' ? 'warning' : context === 'tooltip' ? 'Error' : null;
  }
}
