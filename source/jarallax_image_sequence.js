var JarallaxImageSequence = function(conainer, image_name, amount, leading_numbers){
  this.base_name = image_name.split('.')[0];
  this.file_extension = '.' + image_name.split('.')[1];
  this.qeue = JarallaxImageSequence.BuildQeue(this.base_name,
                                              this.file_extension,
                                              amount,
                                              leading_numbers);
  console.log(this);
  //this.loadQeue();
};

JarallaxImageSequence.prototype.loadQeue = function() {
  if(this.qeue.length > 0){
    var temp_image = new Image();
    temp_image.src = this.qeue.pop();
    temp_image.onload = this.imageLoaded.bind(this);
    //images.push(temp_image);
  }else{
    //next();
  }
};

JarallaxImageSequence.prototype.imageLoaded = function() {
  console.log(this);
};

JarallaxImageSequence.BuildQeue = function(base_name, file_extension, amount, leading_numbers){
  var qeue = [];
  
  for(var i = 0; i < amount; i ++) {
    var url;
    var id = i.toString();
    while (id.length < leading_numbers) {
      id = '0' + id;
    }
    
    console.log(base_name + id + file_extension);
  }
};
