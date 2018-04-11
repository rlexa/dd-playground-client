# DdPlaygroundClient

SPA UI playground client. See [Deployed Site] for project's CI built template view.

## Client Tech

Frameworks involved in the development of the client itself.

### UI Framework

[Angular UI Framework] (>= v5) is used to build the client.

#### UI Experience

[Material Design] framework with a custom color theme provides the general UI components. Corresponding [Material Design Icons] are used throughout the UI.

#### Localization

The client is intended to be dev-oriented only and doesn't contain any localization at the moment.

#### State Handling

[Redux] is used for the majority of the UI state scope.

### Testing

[Jest] is used for unit testing (using matching-snapshot testing for components).

### CI

[Travis] is used for continuous integration incl. testing and deploying to [Firebase] for hosting.

[Angular UI Framework]: https://angular.io
[Deployed Site]: https://dd-playground-client.firebaseapp.com
[Firebase]: https://firebase.google.com/
[Jest]: https://facebook.github.io/jest
[Material Design]: https://material.angular.io
[Material Design Icons]: https://google.github.io/material-design-icons
[Redux]: https://redux.js.org/docs/introduction
[Travis]: https://travis-ci.org