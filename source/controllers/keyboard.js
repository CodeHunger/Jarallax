////////////////////////////////////////////////////////////////////////////////
// Keyboard controller /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerKeyboard = function(keys, preventDefault, repetitiveInput) {
  this.repetitiveInput = repetitiveInput;
  this.preventDefault = preventDefault || false;
  this.keys = keys || {38:-0.01, 40:0.01};
  this.keysState = {};
};

ControllerKeyboard.prototype = new JarallaxController();

ControllerKeyboard.prototype.activate = function(jarallax) {
  JarallaxController.prototype.activate.call(this, jarallax);
  $(document.documentElement).keydown({scope: this}, this.keyDown);
  $(document.documentElement).keyup({scope: this}, this.keyUp);
  
  for(var key in this.keys){
    this.keysState[key] = false;
  }
};

ControllerKeyboard.prototype.deactivate = function(jarallax) {
  JarallaxController.prototype.deactivate.call(this, jarallax);
};

ControllerKeyboard.prototype.keyDown = function(event) {
  var controller = event.data.scope;
  
  if (controller.isActive) {
    for(var key in scope.keys) {
      if(key == event.keyCode) {
        if(scope.keysState[key] !== true || scope.repetitiveInput) {
          scope.jarallax.setProgress(scope.jarallax.progress + scope.keys[key]);
        }
        scope.keysState[key] = true;
        if(scope.preventDefault) {
          event.preventDefault(); 
        }
      }
    }
  }
};

ControllerKeyboard.prototype.keyUp = function(event) {
  if (this.isActive) {
    var scope = event.data.scope;
    for(var key in scope.keys) {
      if(key == event.keyCode) {
        scope.keysState[key] = false;
      }
    }
  }
};

ControllerKeyboard.prototype.update = function(progress) {
  //empty
};
