////////////////////////////////////////////////////////////////////////////////
// onDrag controller /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
ControllerDrag = function(selector, start, end){
  this.object = $(selector);
  this.start = start;
  this.end = end;
  this.container = "";
  this.width = 0;
  
  this.startX = 0;
  this.startY = 0;
};

ControllerDrag.prototype = new JarallaxController();

ControllerDrag.prototype.activate = function(jarallax){
  JarallaxController.prototype.activate.call(this, jarallax);
  this.container = "#scrollbar";
  this.object.draggable({containment:this.container, axis: 'x'});
  this.object.bind("drag", {scope: this}, this.onDrag);
  this.container = $(this.container);
  this.width = $(this.container).innerWidth() - this.object.outerWidth();
};


ControllerDrag.prototype.onDrag = function(event){
  var controller = event.data.scope;
  
  if (controller.isActive) {
    var x = parseInt($(this).css('left'), 10);
    var position = (x / event.data.scope.width);
    event.data.scope.jarallax.setProgress(position);
  }
};

ControllerDrag.prototype.deactivate = function(jarallax){
  JarallaxController.prototype.deactivate.call(this, jarallax);
  this.object.unbind('drag');
  this.object.draggable('destroy');
};

ControllerDrag.prototype.update = function(progress){
  this.object.css('left', progress * this.width);
};
