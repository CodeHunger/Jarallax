////////////////////////////////////////////////////////////////////////////////
// Mousewheel controller ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerMousewheel = function(sensitivity, preventDefault){
  this.sensitivity = -sensitivity;
  this.preventDefault = preventDefault || false;
};


ControllerMousewheel.prototype = new JarallaxController();

ControllerMousewheel.prototype.activate = function(jarallax){
  JarallaxController.prototype.activate.call(this, jarallax);
  $('body').bind('mousewheel', {scope: this} , this.onScroll);
};

ControllerMousewheel.prototype.deactivate = function(jarallax){
  $('body').unbind('mousewheel');
  JarallaxController.prototype.deactivate(this, jarallax);
};

ControllerMousewheel.prototype.onScroll = function(event, delta){
  var controller = event.data.scope;
  
  if (controller.isActive) {
    controller.jarallax.setProgress(controller.jarallax.progress + controller.sensitivity * delta);
    if(controller.preventDefault){
      event.preventDefault(); 
    }
  }
};

ControllerMousewheel.prototype.update = function(progress){
  //empty
};
