describe( 'ng-template', function ngTemplateTests() {

  it( 'should see SystemJS', function() {
    expect( System ).to.be.an( 'object' );
    expect( System.import ).to.be.a( 'function' );
  } );

} );
