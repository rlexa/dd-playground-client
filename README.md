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

[RxState] is used for the majority of the UI state scope.

### Testing

[Jest] is used for unit testing (using matching-snapshot testing for components).

### Misc.

- Following files used (via openssl) for localhost SSL/HTTPS serving:
  - rootCA.key, rootCA.pem, rootCA.srl, server.crt, server.csr, server.key, v3.ext

### CI

[Travis] is used for continuous integration incl. testing and deploying to [Firebase] for hosting.

[angular ui framework]: https://angular.io
[deployed site]: https://dd-playground-client.firebaseapp.com
[firebase]: https://firebase.google.com/
[jest]: https://facebook.github.io/jest
[material design]: https://material.angular.io
[material design icons]: https://google.github.io/material-design-icons
[travis]: https://travis-ci.org
