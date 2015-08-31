/*global System:false, exports:false */

function santiseSource( source ) {
  return source.replace( /(['\\])/g, '\\$1' )
    .replace( /[\f]/g, '\\f' )
    .replace( /[\b]/g, '\\b' )
    .replace( /[\n]/g, '\\n' )
    .replace( /[\t]/g, '\\t' )
    .replace( /[\r]/g, '\\r' )
    .replace( /[\u2028]/g, '\\u2028' )
    .replace( /[\u2029]/g, '\\u2029' );
}

function resolveUrl( address, baseUrl ) {
  if ( baseUrl && address.indexOf( baseUrl ) === 0 ) {
    return address.substr( baseUrl.length );
  }
  return address;
}

exports.translate = function translate( load ) {
  var baseUrl = typeof System.baseURL === 'string' ? System.baseURL : '',
    options = System.ngTemplatePlugin || {},
    url = resolveUrl( load.address, baseUrl );

  return 'var url = ' +
    ( options.serverRelative ? "System.baseURL.replace(/^\\w+:\\/\\/[^\\/]*/,'')+" : '' ) +
    "'" + url + "';" +
    "require('angular').module('ng')" +
    ".run(['$templateCache', function(c) { c.put(" +
      "url, '" +
      santiseSource( load.source ) + "'); }]);" +
    'module.exports = { templateUrl: url };';
};
