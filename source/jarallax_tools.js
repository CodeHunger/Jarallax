////////////////////////////////////////////////////////////////////////////////
// Jarallax tools //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
JarallaxTools = {};

JarallaxTools.hasNumbers = function(t) {
  var expr = new RegExp('\\d');
  return expr.test(t);
  
};

JarallaxTools.isValues = function(object) {
  if(!object) {
    throw new Error('no values set.');
  }
  
  if(typeof object != 'object') {
    throw new Error('wrong data type values. expected: "object", got: "' + 
        typeof object + '"');
  }
  
  if(object.size === 0) {
    throw new Error('Got an empty values object');
  }
  
  return true;
};

JarallaxTools.PlatformAllowed = function(platforms, allMustBeTrue, invert){
  allMustBeTrue = allMustBeTrue || false;
  invert = invert || false;
  for (var i = 0; i < platforms.length; i++) {
    if(platforms[i] == 'any'){
      return !invert;
    }
    if(jQuery.browser[platforms[i]]) {
      if(!allMustBeTrue) {
        return !invert;
      }
    } else if(allMustBeTrue) {
      return invert;
    }
  }
  
  return !invert ? allMustBeTrue : !allMustBeTrue;
};

JarallaxTools.calculateNewValue = function (modifier, original) {
  var result;
  var units = JarallaxTools.getUnits(original);
  if (modifier.indexOf('+') === 0) {
    result = String(parseFloat(original) + parseFloat(modifier) + units);
  } else if (modifier.indexOf('-') === 0) {
    result = String(parseFloat(original) + parseFloat(modifier) + units);
  } else if (modifier.indexOf('*') === 0) {
    result = String(parseFloat(original) * parseFloat(modifier.substr(1)) + units);
  } else if (modifier.indexOf('/') === 0) {
    result = String(parseFloat(original) / parseFloat(modifier.substr(1)) + units);
  } else {
    result = modifier;
  }
  
  if(original.indexOf){
    if(original.indexOf('%') > 0){
      return result + '%';
    }
  }
  return result;
};

JarallaxTools.getUnits = function (string) {
  return string.replace(/\d+/g, '');
};

JarallaxTools.clone = function (obj) {
  var newObj = {};
  for(var i in obj){
    newObj[i] = obj[i];
  }
  
  return newObj;
};

Position = function(x, y){
  this.x = x;
  this.y = y;
};

Position.prototype.add = function(value){
  return new Position(this.x + value.x,
                      this.y + value.y);
};

Position.prototype.subract = function(value){
  return new Position(this.x - value.x,
                      this.y - value.y);
};

////////////////////////////////////////////////////////////////////////////////
// Platforms ///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

JarallaxTools.Platforms = ['webkit',
                           'opera',
                           'msie',
                           'mozilla',
                           'android',
                           'blackBerry',
                           'webOs',
                           'windowsPhone',
                           'iDevice',
                           'iPad',
                           'iPhone',
                           'iPod',
                           'msie',
                           'mobile',
                           'nonMobile'];


jQuery.browser.android = /android/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.blackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.webOs = /webos/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.windowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.iDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.iPad = /ipad/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.iPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.iPod = /ipod/i.test(navigator.userAgent.toLowerCase());
jQuery.browser.mobile = jQuery.browser.android ||
                        jQuery.browser.blackBerry ||
                        jQuery.browser.webOs ||
                        jQuery.browser.windowsPhone ||
                        jQuery.browser.iDevice;
jQuery.browser.nonMobile = !jQuery.browser.mobile;


// This script sets OSName variable as follows:
// "Windows"    for all versions of Windows
// "MacOS"      for all versions of Macintosh OS
// "Linux"      for all versions of Linux
// "UNIX"       for all other UNIX flavors 
// "Unknown OS" indicates failure to detect the OS

jQuery.platform = {};
jQuery.platform.windows = navigator.appVersion.indexOf("Win")!=-1;
jQuery.platform.macOs = navigator.appVersion.indexOf("Mac")!=-1;
jQuery.platform.unix = navigator.appVersion.indexOf("X11")!=-1;
jQuery.platform.linux = navigator.appVersion.indexOf("Linux")!=-1;
jQuery.platform.unknown = !(jQuery.platform.windows ||
                            jQuery.platform.macOs || 
                            jQuery.platform.unix || 
                            jQuery.platform.linux);
