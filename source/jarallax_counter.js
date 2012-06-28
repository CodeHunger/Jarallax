////////////////////////////////////////////////////////////////////////////////
// Jarallax counter class //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
JarallaxCounter = function(jarallax, properties) {
  if (!properties) {
    throw new Error('No properties defined.');
  } else if (!properties.selector) {
    throw new Error('No selector defined. properties.selector.');
  }
  
  this.jarallax = jarallax;
  this.selector = properties.selector;
  this.startNumber = properties.startNumber || 0;
  this.endNumber = properties.endNumber || 100;
  this.startProgress = properties.startProgress || '0%';
  this.endProgress = properties.endProgress || '100%';
  this.decimals = properties.decimals || 0;
  this.stepSize = properties.stepSize;
  
  if (this.decimals === 0 && this.stepSize < 1) {
    tmp = this.stepSize.toString().split('.');
    this.decimals = tmp[1].length;
  }
};

JarallaxCounter.prototype.activate = function() {
  var rawDiff = this.endNumber - this.startNumber;
  var rawNumber = rawDiff * this.jarallax.progress + this.startNumber;
  
  
  
  if (this.startProgress.indexOf('%') >= 0) {
    start = parseInt(this.startProgress,10) / 100;
  } else if (JarallaxTools.hasNumbers(this.startProgress)) {
    start = parseInt(this.startProgress,10) / this.jarallax.maxProgress;
  }
  
  if (this.endProgress.indexOf('%') >= 0) {
    end = parseInt(this.endProgress,10) / 100;
  } else if (JarallaxTools.hasNumbers(this.endProgress)) {
    end = parseInt(this.endProgress,10) / this.jarallax.maxProgress;
  }
  
  if (this.jarallax.progress < start) {
    $(this.selector).html(this.startNumber);
  } else if (this.jarallax.progress > end) {
    $(this.selector).html(this.endNumber);
  } else {
    var duration = end - start;
    var currentTime = (this.jarallax.progress-start);
    var changeInValue = this.endNumber - this.startNumber ;
    var result =  Jarallax.EASING.none(currentTime, this.startNumber , 
        changeInValue, duration);
    
    if (this.stepSize) {
      result = Math.round(result / this.stepSize) * this.stepSize;
    }
    
    if (this.decimals > 0) {
      result = result.toFixed(this.decimals);
    }
    
    $(this.selector).html(result);
  }
};
