////////////////////////////////////////////////////////////////////////////////
// Scroll controller ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerScroll = function(smoothing, horizontal, convertScroll) {
  this.target = $(window);
  this.horizontal = horizontal;
  this.convertScroll = convertScroll;
  $(window).scrollTop(0);
  $(window).scrollLeft(0);
  
  if (!horizontal) {
    var height = parseInt($("body").css('height'),10);
    this.scrollSpace = height - this.target.height();
  } else {
    var width = parseInt($("body").css('width'),10);
    this.scrollSpace = width - this.target.width();
  }
  
  this.smoothing = smoothing || false;
  this.targetProgress = 0;
};

ControllerScroll.prototype = new JarallaxController();

ControllerScroll.prototype.activate = function(jarallax) {
  JarallaxController.prototype.activate.call(this, jarallax);
  if (this.convertScroll) {
    scrollConverter.activate();
  }
  this.target.bind('scroll', {scope: this} , this.onScroll);
};

ControllerScroll.prototype.deactivate = function(jarallax) {
  JarallaxController.prototype.deactivate.call(this, jarallax);
  if (this.convertScroll) {
    scrollConverter.deactivate();
  }
  this.target.unbind('scroll');
};

ControllerScroll.prototype.onScroll = function(event) {
  var controller = event.data.scope;
  //console.log(controller.target.scrollTop());
  
  if(controller.jarallax.jumping){
    if(!controller.jarallax.jumpingAllowed) {
      controller.jarallax.clearSmooth(controller.jarallax);
    }
  }

  if (controller.isActive) {
    var progress;
    if (!controller.horizontal) {
      var y = event.data.y || controller.target.scrollTop();
      progress = y/controller.scrollSpace;
    } else {
      var x = event.data.x || controller.target.scrollLeft();
      progress = x/controller.scrollSpace;
    }
    
    if(!controller.smoothing){
      controller.jarallax.setProgress(progress, true);
    } else {
      controller.targetProgress = Math.min(progress, 1);
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
    if (!controller.horizontal) {
      $(window).scrollTop(scrollPosition);
    } else {
      $(window).scrollLeft(scrollPosition);
    }
  }
};
