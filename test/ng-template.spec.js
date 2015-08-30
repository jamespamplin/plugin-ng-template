describe( 'ng-template', function ngTemplateTests() {

  var angular;

  before( function( done ) {
    System.import( 'angular' ).then( function( ng ) {
      angular = ng;

      return System.import( 'angular-mocks' ).then( function() {} );
    } )
    .then( done, done );
  } );


  it( 'should load template into cache via plugin (baseURL relative)', function( done ) {
    var testTemplateUrl = 'test/fixtures/test-template.html';
    System.import( testTemplateUrl + '!ng-template' )
      .then( function( templateExports ) {
        var ngTemplateCache;

        angular.module( 'test1', [] );
        angular.mock.module( 'test1' );
        angular.mock.inject( function( $templateCache ) {
          ngTemplateCache = $templateCache;
        } );

        expect( templateExports.templateUrl ).to.equal( testTemplateUrl );
        expect( ngTemplateCache.get( testTemplateUrl ) ).to.equal( '<p>Hello "world\'s"</p>\n' );

        ngTemplateCache.removeAll();
      } )
      .then( done, done );
  } );

  it( 'should load template into cache via plugin (server relative)', function( done ) {
    var testTemplateUrl = 'test/fixtures/test-template-2.html';
    System.config( { ngTemplatePlugin: { serverRelative: true } } );
    System.import( testTemplateUrl + '!ng-template' )
      .then( function( templateExports ) {
        var ngTemplateCache;

        angular.module( 'test2', [] );
        angular.mock.module( 'test2' );
        angular.mock.inject( function( $templateCache ) {
          ngTemplateCache = $templateCache;
        } );

        expect( templateExports.templateUrl ).to.equal( '/base/' + testTemplateUrl );
        expect( ngTemplateCache.get( '/base/' + testTemplateUrl ) ).to.equal( '<p>Hello world 2</p>\n' );

        ngTemplateCache.removeAll();
      } )
      .then( done, done );
  } );

} );
