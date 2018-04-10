# DdPlaygroundClient

SPA UI playground client.

## Client Tech

Frameworks involved in the development of the client itself.

### UI Framework

[Angular] (>= v5) is used to build the client.

#### UI Experience

[Material] framework with a custom color theme provides the general UI components. Corresponding [Material Icons] are used throughout the UI.

#### Localization

The client is intended to be dev-oriented only and doesn't contain any localization at the moment.

#### State Handling

[Redux] is used for the majority of the UI state scope.

### Testing

[Jest] is used for unit testing (using matching-snapshot testing for components).

### CI

[Travis] is used for continuous integration incl. testing.

[Angular]: https://angular.io/ "Angular UI Framework"
[Jest]: https://facebook.github.io/jest/ "Jest Testing"
[Material]: https://material.angular.io/ "Material Design"
[Material Icons]: https://google.github.io/material-design-icons/ "Material Design Icons"
[Redux]: https://redux.js.org/docs/introduction/ "Redux Library"
[Travis]: https://travis-ci.org/ "Travis-CI"