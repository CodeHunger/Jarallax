////////////////////////////////////////////////////////////////////////////////
// jarallax class //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var Jarallax = function () {
  this.FPS = 24;
  this.FPS_INTERVAL = 1000 / this.FPS;
  this.FRAME_DATA_SAMPLE = 24;
  this.FRAME_DATA_REFRESH = 12;
  this.fpsTop = 0;
  this.fpsBottom = 1000;
  this.animations = [];
  this.defaultValues = [];
  this.progress = 0.0;
  this.properties = {};
  this.prevProgress = 0.0;
  this.controllers = [];
  this.maxProgress = 1;
  this.timer = undefined;
  this.allowWeakProgress = true;
  this.frameRate = this.FPS;
  this.stepSize = 0;
  this.jumping = false;
  
  for(var argument in arguments) {
    if (arguments[argument] instanceof Array){
      this.controllers = arguments[argument];
    } else if (arguments[argument].isController) {
      this.controllers.push(arguments[argument]);
    } else if (arguments[argument] instanceof Object) {
      this.properties = arguments[argument];
    } else {
      console.log('WARNING: bad argument ' + argument);
    }
  }
  
  if (!this.controller) {
    if($.browser.iDevice) {
      this.controllers.push(new ControllerApple(false));
    } else if ($.browser.mozilla) {
      this.controllers.push(new ControllerScroll(false,
          this.properties.horizontal, this.properties.disableVertical));
    } else {
      this.controllers.push(new ControllerScroll(true,
          this.properties.horizontal, this.properties.disableVertical));
    }
  }

  for (var i in this.controllers) {
    this.controllers[i].activate(this);
  }

  this.frameChart = [];
  for(var j = 1; j <= 600; j++) {
    this.frameChart[j] = (1000 / j);
  }
};

////////////////////////////////////////////////////////////////////////////////
// Jarallax methods ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
Jarallax.prototype.setProgress = function (progress, isWeak) {
  if (progress > 1) {
    progress = 1;
  } else if (progress < 0) {
    progress = 0;
  }
  
  console.log(progress);

  if(this.progress != progress){
    this.progress = progress;
    if (this.allowWeakProgress || !weak) {
      
      this.previousTime = new Date();
      this.currentTime = new Date();
      var weak = isWeak || false;

      for (var defaultValue in this.defaultValues) {
        this.defaultValues[defaultValue].activate(this.progress);
      }

      for (var animation in this.animations) {
        this.animations[animation].activate(this.progress);
      }

      for (var controller in this.controllers) {
        this.controllers[controller].update(this.progress);
      }

      this.currentTime = new Date();
      this.stepSize = Math.max(this.currentTime - this.previousTime, this.stepSize);
    }
  }
};

Jarallax.prototype.clearAnimations = function() {
  this.animations = [];
};

Jarallax.prototype.clearDefaults = function() {
  this.defaultValues = [];
};

Jarallax.prototype.clearControllers = function() {
  this.controllers = [];
};

Jarallax.prototype.jumpToProgress = function (progress, time, fps) {
  if (!progress.indexOf) {
    progress = progress / this.maxProgress;
  } else if (progress.indexOf('%') != -1) {
    progress = parseFloat(progress) / 100;
  }

  if(progress == this.progress) {
    return false;
  }

  if (progress > 1) {
    progress = 1;
  } else if (progress < 0) {
    progress = 0;
  }

  this.smoothProperties = {};
  this.smoothProperties.timeStep = 1000 / fps;
  this.smoothProperties.steps = time / this.smoothProperties.timeStep;
  this.smoothProperties.currentStep = 0;

  this.smoothProperties.startProgress = this.progress;
  this.smoothProperties.diffProgress = progress - this.progress;
  this.smoothProperties.previousValue = this.progress;
  this.smooth();
  this.allowWeakProgress = false;

  return false;
};

Jarallax.prototype.smooth = function (externalScope) {
  var scope;
  if (!externalScope) {
    scope = this;
  } else {
    scope = externalScope;
  }

  scope.smoothProperties.currentStep++;
  clearTimeout(scope.timer);
  if (scope.smoothProperties.currentStep < scope.smoothProperties.steps) {
    var position = scope.smoothProperties.currentStep / scope.smoothProperties.steps;
    var newProgress = Jarallax.EASING.easeOut(position,
                                       scope.smoothProperties.startProgress,
                                       scope.smoothProperties.diffProgress,
                                       1,
                                       5);

    scope.jumpingAllowed = true;
    scope.setProgress(newProgress);
    scope.jumpingAllowed = false;
    scope.timer = window.setTimeout(function(){scope.smooth(scope);}, scope.smoothProperties.timeStep);
    scope.smoothProperties.previousValue = newProgress;
    scope.allowWeakProgress = false;
  } else {
    scope.jumpingAllowed = true;
    scope.setProgress(scope.smoothProperties.startProgress + scope.smoothProperties.diffProgress);
    scope.jumpingAllowed = false;
    scope.clearSmooth(scope);
  }
};

Jarallax.prototype.clearSmooth = function(scope){
  scope.allowWeakProgress = true;
  clearTimeout(scope.timer);
  delete scope.smoothProperties;
};

Jarallax.prototype.setDefault = function (selector, values) {
  if (!selector) {
    throw new Error('no selector defined.');
  }

  if (JarallaxTools.isValues(values))
  {
    var newDefault = new JarallaxObject(selector, values);
    newDefault.activate();
    this.defaultValues.push(newDefault);
  }
};

Jarallax.prototype.addStatic = function (selector, values) {
  if (!selector) {
    throw new Error('no selector defined.');
  }

  if (JarallaxTools.isValues(values))
  {
    var newDefault = new JarallaxStatic(selector, values[0], values[1]);
    this.defaultValues.push(newDefault);
  }
};

Jarallax.prototype.addCounter = function (properties) {
  this.animations.push(new JarallaxCounter(this, properties));
};

Jarallax.prototype.addController = function (controller, activate) {
  this.controllers.push(controller);

  if (activate) {
    controller.activate(this);
  }
};

Jarallax.prototype.addAnimation = function (selector, values, platforms, allMustBeTrue) {
  if (!platforms) {
    platforms = ['any'];
  } else if(platforms.substring) {
    platforms = [platforms];
  } else {
    platforms = platforms || [JarallaxTools.Platform.Any];
  }

  if (JarallaxTools.PlatformAllowed(platforms, allMustBeTrue)) {
    var newAnimation;

    if (!selector) {
      throw new Error('no selector defined.');
    }

    var returnValue = [];
    if (JarallaxTools.isValues(values)) {
      if (values.length) {
        for (var i = 0; i < values.length - 1; i++) {
          if (values[i] && values[i + 1])
          {
            if (values[i].progress && values[i + 1].progress) {
              if (values[i + 1].progress.indexOf('%') == -1) {
                if (this.maxProgress < values[i + 1].progress) {
                  this.maxProgress = values[i + 1].progress;
                }
              }
              newAnimation = new JarallaxAnimation(selector, values[i], values[i + 1], this);
              this.animations.push(newAnimation);
              returnValue.push(newAnimation);
            }
            else
            {
              throw new Error('no animation boundry found.');
            }
          }
          else
          {
            throw new Error('bad animation data.');
          }
        }
      } else {
        if (!values.progress) {
          values.progress = '100%';
        }
        var startValues = {};

        for (var j in values) {
          startValues[j] = $(selector).css(j);
        }

        startValues.progress = '0%';


        newAnimation = new JarallaxAnimation(selector, startValues, values, this);
        this.animations.push(newAnimation);
        returnValue.push(newAnimation);
      }
    }
    return returnValue;
  }
  return false;
};

Jarallax.prototype.cloneAnimation = function (selector, adittionalValues, animations) {
  if (!selector) {
    throw new Error('no selector defined.');
  }

  var newAnimations = [];
  var adittionalValuesArray = [];

  for (var i = 0; i < animations.length + 1; i++) {
    if (adittionalValues instanceof Array) {
      adittionalValuesArray.push(adittionalValues[i]);
    } else {
      adittionalValuesArray.push(adittionalValues);
    }
  }

  for (i = 0; i < animations.length; i++) {
    var currentAnimation = animations[i];
    var newStart = JarallaxTools.clone(currentAnimation.startValues);
    var newEnd = JarallaxTools.clone(currentAnimation.endValues);

    var adittionalValueStart = adittionalValuesArray[i];
    var adittionalValueEnd = adittionalValuesArray[i + 1];

    for (var j in newStart) {
      if (adittionalValueStart[j]) {
        newStart[j] = JarallaxTools.calculateNewValue(adittionalValueStart[j], newStart[j]);
      }
    }

    for (var k in newEnd) {
      if (adittionalValueEnd[k]) {
        newEnd[k] = JarallaxTools.calculateNewValue(adittionalValueEnd[k], newEnd[k]);
      }
    }

    newAnimations.push(this.addAnimation(selector, [newStart, newEnd])[0]);

  }
  return newAnimations;
};

////////////////////////////////////////////////////////////////////////////////
// Jarallax static methods /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
Jarallax.EASING = {
  'linear':function (currentTime, beginningValue, changeInValue, duration, power) {
    return currentTime / duration * changeInValue + beginningValue;
  },

  'easeOut':function (currentTime, beginningValue, changeInValue, duration, power) {
   if (power === undefined) {
    power = 2;
   }
   return ((Math.pow((duration - currentTime) / duration, power) * -1) + 1) * changeInValue + beginningValue;
  },
  'easeIn':function (currentTime, beginningValue, changeInValue, duration, power) {
   if (power === undefined) {
    power = 2;
   }
   return Math.pow(currentTime / duration, power) * changeInValue + beginningValue;
  },
  'easeInOut':function (currentTime, beginningValue, changeInValue, duration, power) {
   if (power === undefined) {
    power = 2;
   }
   changeInValue /= 2;
   currentTime *= 2;
   if (currentTime < duration) {
     return Math.pow(currentTime / duration, power) * changeInValue + beginningValue;
   } else {
     currentTime = currentTime - duration;
     return ((Math.pow((duration - currentTime) / duration, power) * -1) + 1) * changeInValue + beginningValue + changeInValue;
   }

   return Math.pow(currentTime / duration, power) * changeInValue + beginningValue;
  }
};

Jarallax.EASING.none = Jarallax.EASING.linear;
