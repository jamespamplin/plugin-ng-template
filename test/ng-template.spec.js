describe( 'ng-template', function ngTemplateTests() {

  var angular;

  before( function( done ) {
    System.import( 'angular' ).then( function( ng ) {
      angular = ng;
    } ).then( done, done );
  } );

  it( 'should see SystemJS', function() {
    expect( System ).to.be.an( 'object' );
    expect( System.import ).to.be.a( 'function' );
  } );

  it( 'should load template into cache via plugin', function( done ) {
    System.import( 'test/fixtures/test-template.html!ng-template' )
      .then( function( templateExports ) {

      } )
      .then( done, done );
  } );

} );
