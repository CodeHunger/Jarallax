////////////////////////////////////////////////////////////////////////////////
// Mobile controller ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerMobile = function(disableDefault, height){
  this.disableDefault = disableDefault || false;
  this.y = 0;
  this.previousY = undefined;
  this.height = height;
};

ControllerMobile.prototype = new JarallaxController();

ControllerMobile.prototype.activate = function(jarallax){
  JarallaxController.prototype.activate.call(this, jarallax);
  
  if (!this.height) {
    this.height = this.height = parseInt($("body").css('height'),10);
    if (this.height ==  $(window).height) {
      this.height = parseInt($("#wrapper").css('height'),10);
    }
  }
  $('body').bind('touchmove', {scope: this}, this.onTouchMove);
  $('body').bind('touchend', {scope: this}, this.onTouchEnd);
  //TODO:
  //horizontal scrolling
  //flip_direction
};

ControllerMobile.prototype.onTouchEnd = function(event){
  this.previousY = undefined;
};

ControllerMobile.prototype.onTouchMove = function(event, manuel){
  if(this.isActive) {
    if (this.disableDefault) {
      event.preventDefault();
    }
    
    var scope = event.data.scope;
    var targetEvent = manuel ? event : event.originalEvent.touches.item(0);    
    
    if(scope.previousY === undefined) {
      scope.previousY = targetEvent.clientY;
    }
    else
    {
      scope.y += (targetEvent.clientY - scope.previousY);
      scope.y = scope.y < scope.height ? scope.y : scope.height;
      scope.y = scope.y > 0 ? scope.y : 0;
      scope.previousY = targetEvent.clientY;
      var poss = scope.y/scope.height;
      
      scope.jarallax.setProgress(scope.y/scope.height);
    }
  }
};


ControllerMobile.prototype.deactivate = function(jarallax){
  JarallaxController.prototype.deactivate.call(this, jarallax);
  $('body').unbind('touchmove');
};

ControllerMobile.prototype.update = function(progress){
  //empty
};

