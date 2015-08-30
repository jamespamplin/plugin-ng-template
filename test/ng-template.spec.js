describe( 'ng-template', function ngTemplateTests() {

  var angular;

  before( function( done ) {
    System.import( 'angular' ).then( function( ng ) {
      angular = ng;

      return System.import( 'angular-mocks' ).then( function() {} );
    } )
    .then( done, done );
  } );


  it( 'should load template into cache via plugin', function( done ) {
    var testTemplateUrl = 'test/fixtures/test-template.html';
    System.import( testTemplateUrl + '!ng-template' )
      .then( function( templateExports ) {
        var ngTemplateCache;

        angular.module( 'tester', [] );
        angular.mock.module( 'tester' );
        angular.mock.inject( function( $templateCache ) {
          ngTemplateCache = $templateCache;
        } );

        expect( ngTemplateCache.get( testTemplateUrl ) ).to.equal( '<p>Hello world</p>\n' );
        expect( templateExports.templateUrl ).to.equal( testTemplateUrl );
      } )
      .then( done, done );
  } );

} );
