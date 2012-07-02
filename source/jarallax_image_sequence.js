JarallaxImageSequence = function(conainer, image_name, amount, leading_numbers){
  this.base_name = image_name.split('.')[0];;
  this.file_extension = '.' + image_name.split('.')[1];
  
  
}

JarallaxImageSequence.BuilQeue = function(base_name, file_extension, amount, leading_numbers){
  for(var i = 0; i < amount; i ++) {
    var url;
    var id = i.toString();
    while (id.length < leading_numbers) {
      id = '0' + id;
    }
    
    console.log('id');
  }
}


