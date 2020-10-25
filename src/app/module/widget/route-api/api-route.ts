export enum ApiRoute {
  Location = 'location',
  Movie = 'movie',
  Person = 'person',
  Species = 'species',
  Vehicle = 'vehicle',
}

export const apiRouteIcon: Record<ApiRoute, string> = {
  [ApiRoute.Location]: 'place',
  [ApiRoute.Movie]: 'movie',
  [ApiRoute.Person]: 'person',
  [ApiRoute.Species]: 'pets',
  [ApiRoute.Vehicle]: 'airport_shuttle',
};

export const apiRouteTooltip: Record<ApiRoute, string> = {
  [ApiRoute.Location]: 'Location',
  [ApiRoute.Movie]: 'Movie',
  [ApiRoute.Person]: 'Person',
  [ApiRoute.Species]: 'Species',
  [ApiRoute.Vehicle]: 'Vehicle',
};
