var pdfSupport = require('browser-pdf-support');

var builtInMimeTypePatterns = [
  /^image\//,
  'text/plain',
  'text/html'
];

function isBuiltInMimeType(mimeType) {
  for (var n = 0; n < builtInMimeTypePatterns.length; n++) {
    var pattern = builtInMimeTypePatterns[n];

    if (typeof(pattern) == 'string') {
      if (mimeType == pattern) {
        return true;
      }
    } else if (pattern.test(mimeType)) {
      return true;
    }
  }
}

function isNavigatorMimeType(mimeType) {
 return Array.prototype.map.call(navigator.mimeTypes, function (mimeType) {
   return mimeType.type;
 }).indexOf(mimeType) != -1;
}

function isPdfAndIsSupported(mimeType) {
  if (mimeType == 'application/pdf') {
    return pdfSupport();
  }
}

module.exports = function (mimeType) {
  return isBuiltInMimeType(mimeType)
    || isNavigatorMimeType(mimeType)
    || isPdfAndIsSupported(mimeType);
};
