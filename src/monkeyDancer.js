// Per TA, image and <span> elements are both inline
var MonkeyDancer = function(top, left, timeBetweenSteps) {

  Dancer.call(this, top, left, timeBetweenSteps);

  // Add append() here, to randomize Monkey's location
  this.$node.append('<div class="monkey dance"><img id="monkeyPic" onmouseover="mouseFunction(this)" src="pics/monkey2.png"></div>');
  // Remove the red border, from the animals
  this.$node.removeClass("dancer");
  this.$node.addClass("animal");
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};
  
MonkeyDancer.prototype = Object.create(Dancer.prototype);
MonkeyDancer.prototype.constructor = MonkeyDancer;

MonkeyDancer.prototype.step = function() {

  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  // console.log(this.$node);
  //this.$node.toggle();  // Some issue here
};

  