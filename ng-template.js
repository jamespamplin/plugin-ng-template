/*global System:false, exports:false */

function santiseSource( source ) {
  return source.replace( /(["\\])/g, '\\$1' )
    .replace( /[\f]/g, '\\f' )
    .replace( /[\b]/g, '\\b' )
    .replace( /[\n]/g, '\\n' )
    .replace( /[\t]/g, '\\t' )
    .replace( /[\r]/g, '\\r' )
    .replace( /[\u2028]/g, '\\u2028' )
    .replace( /[\u2029]/g, '\\u2029' );
}

exports.translate = function( load ) {
  var url = typeof System.baseURL === 'string' && load.address.indexOf( System.baseURL ) === 0 ? load.address.substr( System.baseURL.length ) : load.address;
  return "require('angular').module('ng')" +
    ".run(['$templateCache', function(c) { c.put('" + url + "', '" + santiseSource( load.source ) + "') }]);" +
    "module.exports = { templateUrl: '" + url + "' };";
};
