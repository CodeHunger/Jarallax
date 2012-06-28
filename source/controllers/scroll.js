////////////////////////////////////////////////////////////////////////////////
// Scroll controller ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerScroll = function(smoothing, scrollSpace) {
  this.target = $(window);
  this.height = parseInt($("body").css('height'),10);
  this.scrollSpace = scrollSpace || this.height - this.target.height();
  
  if (this.scrollSpace < 10) {
    this.height = parseInt($("#wrapper").css('height'),10);
    this.scrollSpace = this.height - this.target.height();
  }
  
  this.smoothing = smoothing || false;
  
  this.targetProgress = 0;
};

ControllerScroll.prototype = new JarallaxController();

ControllerScroll.prototype.activate = function(jarallax) {
  JarallaxController.prototype.activate.call(this, jarallax);
  this.target.bind('scroll', {scope: this} , this.onScroll);
};

ControllerScroll.prototype.deactivate = function(jarallax) {
  JarallaxController.prototype.deactivate.call(this, jarallax);
  this.target.unbind('scroll');
};

ControllerScroll.prototype.onScroll = function(event) {
  var controller = event.data.scope;
  
  if (controller.isActive) {
    var y = event.data.y || controller.target.scrollTop();
    var progress = y/controller.scrollSpace;
    
    
    if(!controller.smoothing){
      controller.jarallax.setProgress(progress, true);
    } else {
      controller.targetProgress = progress;
      controller.smooth();
    }
  }
};

ControllerScroll.prototype.smooth = function(externalScope) {
  var scope;
  if (!externalScope) {
    scope = this;
  } else {
    scope = externalScope;
  }

  var oldProgress = scope.jarallax.progress;
  
  var animationSpace =  scope.targetProgress - oldProgress;
  clearTimeout(scope.timer);
  
  if(animationSpace > 0.0001 || animationSpace < -0.0001){
    var newProgress = oldProgress + animationSpace / 5;
    
    scope.timer = window.setTimeout(function(){
        scope.smooth(scope);}, scope.jarallax.FPS_INTERVAL);
    scope.jarallax.setProgress(newProgress, true);
  }else{
    scope.jarallax.setProgress(scope.targetProgress, true);
  }
};

ControllerScroll.prototype.update = function(progress) {
  var scrollPosition = progress * this.scrollSpace;
  
  if(!this.jarallax.allowWeakProgress) {
    $('body').scrollTop(scrollPosition);
  }
};
