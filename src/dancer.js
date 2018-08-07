// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {
  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;  // Need to add the arg as a property of dancer (otherwise, crashing browser)
  this.step();  // Invokes the method below 

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);
};

Dancer.prototype.step = function() {

  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  
  // Use bind(), to avoid 'this = "undefined"' later during setTimeout
  // Also, access property from line 5
  setTimeout(this.step.bind(this), this.timeBetweenSteps);  
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};