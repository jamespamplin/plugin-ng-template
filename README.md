# plugin-ng-template
> SystemJS / JSPM plugin for loading and caching angular templates

Inspired by [ngtemplate-loader](https://github.com/WearyMonkey/ngtemplate-loader) for Webpack.

## Installation
Easiest to install and configure with [JSPM](http://jspm.io/).

Installing with JSPM via npm repo:

    jspm install ng-template=npm:plugin-ng-template

Installing with JSPM via github repo:

    jspm install ng-template=github:jamespamplin/plugin-ng-template

## Usage
Importing or requiring an angular `html` template with `!ng-template` appended
to the end will invoke the plugin, and load the html source into angular's
[`$templateCache`].

```js
// ES6 angular module
import angular from 'angular';

import myTemplate from 'my-template.html!ng-template';

export default angular.module( 'myModule', [] )
  .directive( 'myDirective', function() {
    return {
      templateUrl: myTemplate.templateUrl,
      // ...
    };
  } );
```

The above syntax uses the `templateUrl` property which is exported from the
loaded template. The `templateUrl` property stores the url which was used to
cache the template in the [`$templateCache`].

The cache is global, and can be used anywhere a template URL is used, such as
in an `ng-include` or in routes.

```js
// File: app.js
import angular from 'angular';
import 'angular-route';

import mainTemplate from 'templates/main-template.html';
import 'templates/other-template.html';

angular.module( 'myApp', [ 'ngRoute' ] )
  .config( function( $routeProvider ) {
    $routeProvider
      .when( '/', {
        templateUrl: mainTemplate.templateUrl,
        controller: 'MainController'
      } )
  } );
```
```html
<!-- File: templates/main-template.html -->
<div ng-include=" 'templates/other-template.html' "></div>
```

## Options

### `serverRelative`
By default, all template URLs will be derived from the `baseURL` as its
configured by SystemJS.

```js
System.config( { baseURL: '/assets' } );
```

For the above config, the template file: `/assets/templates/my-template.html`
will be cached as `templates/my-template.html`.

```html
<div ng-include=" 'templates/my-template.html' "></div>
```

To use a server relative URL instead, set:

```js
System.config( {
  ngTemplatePlugin: {
    serverRelative: true
  }
} );
```

This will ensure all templates are cached against their server relative url.

```html
<div ng-include=" '/assets/templates/my-template.html' "></div>
```


[`$templateCache`]: https://docs.angularjs.org/api/ng/service/$templateCache
