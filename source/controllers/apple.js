////////////////////////////////////////////////////////////////////////////////
// Apple mobile controller /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerApple = function(scrollPage) {
  if(scrollPage === undefined) {
    this.scrollPage = true;
  } else {
    this.scrollPage = scrollPage;
  }
  
  this.target = $('body');
  this.scrollPostion = new Position(0, 0);
};

ControllerApple.prototype = new JarallaxController();

ControllerApple.prototype.activate = function(jarallax) {
  
  JarallaxController.prototype.activate.call(this, jarallax);
  
  this.scrollSpace = $('body').height() - $(window).height();
  this.target.bind('touchmove', {scope: this}, this.onMove);
  this.target.bind('touchstart', {scope: this}, this.onTouch);
  
};

ControllerApple.prototype.deactivate = function(jarallax) {
  JarallaxController.prototype.deactivate.call(this, jarallax);
  this.target.unbind('touchmove');
  this.target.unbind('touchstart');
};

ControllerApple.prototype.onTouch = function(event) {
  var controller = event.data.scope;
  var targetEvent = event.originalEvent.touches.item(0);
  
  controller.startPosition = new Position(targetEvent.clientX, targetEvent.clientY);
  
  event.preventDefault();
};

ControllerApple.prototype.onMove = function(event) {
  var controller = event.data.scope;
  var targetEvent = event.originalEvent.touches.item(0);
  var tempPosition = new Position(targetEvent.clientX, targetEvent.clientY);
  var vector = tempPosition.subract(controller.startPosition);
  controller.startPosition = tempPosition;
  controller.scrollPostion = vector.add(controller.scrollPostion);
  
  controller.scrollPostion.y = Math.max(Math.min(controller.scrollPostion.y, 0),-controller.scrollSpace);
  controller.jarallax.setProgress(-controller.scrollPostion.y / controller.scrollSpace, false);
  $('body').scrollTop(controller.scrollSpace * controller.jarallax.progress);
  
  if (!controller.scrollPage) {
    event.preventDefault();
  }
};

ControllerApple.prototype.update = function(progress) {
  this.position.y = Math.round(progress * this.scrollSpace);
};
