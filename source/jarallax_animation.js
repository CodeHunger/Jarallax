////////////////////////////////////////////////////////////////////////////////
// Jarallax animation class ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
JarallaxAnimation = function (selector, startValues, endValues, jarallax) {
  this.progress = -1;
  this.selector = selector;
  this.startValues = startValues;
  this.endValues = endValues;
  this.jarallax = jarallax;
};

JarallaxAnimation.prototype.activate = function (progress) {
  if (this.progress != progress) {
    var start;
    var end;
    var style;
    
    if (this.startValues.style === undefined) {
      style = {easing:'linear'};
    } else{
      style = this.startValues.style;
    }
    
    if (this.startValues.progress.indexOf('%') >= 0) {
      start = parseInt(this.startValues.progress,10) / 100;
    } else if (JarallaxTools.hasNumbers(this.startValues.progress)) {
      start = parseInt(this.startValues.progress,10) / this.jarallax.maxProgress;
    }
    
    if (this.endValues.progress.indexOf('%') >= 0)
    {
      end = parseInt(this.endValues.progress,10) / 100;
    } else if (JarallaxTools.hasNumbers(this.endValues.progress)) {
      end = parseInt(this.endValues.progress,10) / this.jarallax.maxProgress;
    }
    
    if (this.startValues.event) {
      this.dispatchEvent(this.progress, progress, start, end);
    }
    
    if (progress >= start && progress <= end ) {
      for(var i in this.startValues) {
        if (i !== 'progress' && i !== 'style' && i !== 'event') {
          if (undefined !== this.endValues[i] && i !== 'display' && i !== 'backgroundImage') {
            var units = JarallaxTools.getUnits(this.startValues[i]+'');
            units = units.replace('-','');
            var startValue = parseFloat(this.startValues[i]);
            var endValue = parseFloat(this.endValues[i]);
            
            var duration = end - start;
            var currentTime = (progress-start);
            var changeInValue = endValue - startValue ;
            var result =  Jarallax.EASING[style.easing](currentTime, 
                startValue , changeInValue, duration, style.power);
            
            if(units !== '.'){
              result+= units;
            }
            $(this.selector).css(i,result);
          } else {
            $(this.selector).css(i,this.startValues[i]);
          }
        }
      }
    }
    this.progress = progress;
  }
};

JarallaxAnimation.prototype.dispatchEvent = function(progress_old, progress_new, 
    start, end) {
  var events = this.startValues.event;
  var event_data = {};
  event_data.animation = this;
  event_data.selector = this.selector;
  
  if (progress_new >= start && progress_new <= end ) {
    if (events.start && progress_old < start) {
      event_data.type = 'start';
      events.start(event_data);
    }
    
    if (events.start && progress_old > end) {
      event_data.type = 'rewind';
      events.start(event_data);
    }
    
    if (events.animating) {
      event_data.type = 'animating';
      events.animating(event_data);
    } 
    
    if (events.forward && progress_old < progress_new) {
      event_data.type = 'forward';
      events.forward(event_data);
    }
    
    if (events.reverse && progress_old > progress_new) {
      event_data.type = 'reverse';
      events.reverse(event_data);
    }
    
  } else {
    if (events.complete && progress_old < end && progress_new > end) {
      event_data.type = 'complete';
      events.complete(event_data);
    }
    
    if (events.rewinded && progress_old > start && progress_new < start) {
      event_data.type = 'rewind';
      events.rewinded(event_data);
    }
  }
};
