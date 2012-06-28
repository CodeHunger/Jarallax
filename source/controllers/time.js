////////////////////////////////////////////////////////////////////////////////
// Time controller /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerTime = function(speed, interval, type) {
  this.interval = interval;
  this.speed = speed;
  this.playForward = true;
  this.type = type || ControllerTime.TYPES.NORMAL;
};

ControllerTime.prototype = new JarallaxController();


ControllerTime.prototype.activate = function(jarallax) {
  JarallaxController.prototype.activate.call(this, jarallax);
  this.progress = 0;
  this.timer = setInterval(this.onInterval.bind(this, {scope: this}), this.interval);
};

ControllerTime.prototype.deactivate = function(jarallax) {
  JarallaxController.prototype.deactivate.call(this, jarallax);
  clearInterval(this.timer);
};


ControllerTime.prototype.onInterval = function(event) {
  var scope = event.scope;
  if (this.isActive) {
    if(this.playForward) {
      this.progress+= this.speed;
    }else{
      this.progress-= this.speed;
    }
    
    if(this.progress >= 1) {
      switch(this.type) {
        case ControllerTime.TYPES.NORMAL:
          this.progress = 1;
          this.deactivate(this.jarallax);
          break;
        case ControllerTime.TYPES.LOOP:
          this.progress = 0;
          break;
        case ControllerTime.TYPES.BOUNCE:
          this.progress = 1 - this.speed;
          this.playForward = false;
          break;
      }
    } else if(this.progress <= 0) {
      this.progress = 0 + this.speed;
      this.playForward = true;
    }
    this.jarallax.setProgress(this.progress);
  }
};

ControllerTime.TYPES = {NORMAL: 0,
                        LOOP: 1,
                        BOUNCE: 2};

ControllerTime.prototype.update = function(progress) {
  this.progress = progress;
};
