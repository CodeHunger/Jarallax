////////////////////////////////////////////////////////////////////////////////
// Jarallax Controller base class //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
JarallaxController = function() {
  this.isActive = false;
  this.bindings = [];
  this.isController = true;
};


JarallaxController.prototype.activate = function(jarallax) {
  this.isActive = true;
  if (!this.jarallax || this.jarallax !== jarallax) {
    this.jarallax = jarallax;
  }
};

JarallaxController.prototype.deactivate = function(jarallax) {
  this.isActive = false;
};

JarallaxController.prototype.update = function(progress) {
  //do nothing
};
