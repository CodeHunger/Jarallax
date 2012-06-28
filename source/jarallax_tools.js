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

/*jQuery.browser.webkit
jQuery.browser.opera
jQuery.browser.msie
jQuery.browser.mozilla*/

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
//(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));})(navigator.userAgent||navigator.vendor||window.opera);

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
