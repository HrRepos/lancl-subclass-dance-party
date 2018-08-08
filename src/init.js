// [Future Ref]: for 'danceBattle' event listender:
// calculate your distance from each other dancer. You can have a dancer find its n closest neighbors,
// and do something based on their positions. (Use Pythagorean Theorem.)

$(document).ready(function() {
  window.dancers = []; 
  window.pigArr = [];
  window.monkeyArr = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * 
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(// Newly modified; added 'new' here
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
  });

  // Add a event listener, for pig dancer
  $('.addPigDancerButton').on('click', function(event) {
   
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
    var dancerMakerFunction = window[dancerMakerFunctionName];
    
    var dancer = new dancerMakerFunction(// Newly modified; added 'new' here
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );
    
    $(dancer.$node).addClass('sticker');// Add animation to pigs

    dancers.push(dancer);
    pigArr.push(dancer);
    $('body').append(dancer.$node);
  });
  
  // Add a event listener, for monkey dancer
  $('.addMonkeyDancerButton').on('click', function(event) {
   
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name'); //MonkeyDancer
    var dancerMakerFunction = window[dancerMakerFunctionName];

    var dancer = new dancerMakerFunction(// Newly modified; added 'new' here
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      Math.random() * 1000
    );

    $(dancer.$node).addClass('sticker');// Add animation to monkeys

    dancers.push(dancer);    
    monkeyArr.push(dancer);    
    $('body').append(dancer.$node);
  });

  // Add a event listener, for animals to line up
  $('.lineUp').on('click', function(event) {
    var styleSettings = {
      'position': 'absolute',
      'top': '650px',
      'left': '0px'
    };
    
    var width = $('body').width() / (dancers.length + 1);
    for (var i = 0; i < dancers.length; i++) {
      if ($(dancers[i].$node).hasClass('pigBattle')) {
        $(dancers[i].$node).removeClass('pigBattle');
      }
      if ($(dancers[i].$node).hasClass('monkeyBattle')) {
        $(dancers[i].$node).removeClass('monkeyBattle');
      }
      // Stop all animals from moving, for now (when lined up)
      if ($(dancers[i].$node).hasClass('sticker')) {
        $(dancers[i].$node).removeClass('sticker');
      }
      styleSettings.left = ((i + .5) * width) + 'px';
      //debugger;
      // $(dancers[i].$node).css(styleSettings);
      $(dancers[i].$node).animate(styleSettings);// Animate shows the path of motion
    }

  });
  

  // Dance battle!
  $('.danceBattle').on('click', function(event) {
    var pigSettings = {
      'position': 'absolute',
      'top': '0px',
      'left': '1700px'
    };

    var monkeySettings = {
      'position': 'absolute',
      'top': '0px',
      'left': '100px'
    };

    var monkeyDistance = $('body').height() / (monkeyArr.length + 1);
    for (var x = 0; x < monkeyArr.length; x++) {
      if ($(monkeyArr[x].$node).hasClass('monkeyBattle')) {
        $(monkeyArr[x].$node).removeClass('monkeyBattle');
      }
      monkeySettings.top = ((x + .5) * monkeyDistance) + 'px';
      $(monkeyArr[x].$node).animate(monkeySettings);  // Animate shows the path of motion
    }

    var pigDistance = $("body").height() / (pigArr.length + 1);
    for (var i = 0; i < pigArr.length; i++) {
      if ($(pigArr[i].$node).hasClass('pigBattle')) {
        $(pigArr[i].$node).removeClass('pigBattle');
      }
      pigSettings.top = ((i + .5) * pigDistance) + 'px';
      $(pigArr[i].$node).animate(pigSettings);  // Animate shows the path of motion
    }
    
    // Set middle locations, for animals in dance battle
    var pigSettings2 = {
      'position': 'absolute',
      'top': '650px',
      'left': '1000px'
    };
    var monkeySettings2 = {
      'position': 'absolute',
      'top': '650px',
      'left': '800px'
    };

    // Pick the middle animals
    // Take a pause, before moving to the center (for dance battle)
    $(pigArr[Math.floor(pigArr.length / 2)].$node).delay(1000).animate(pigSettings2);

    // wait until animal battlers are in the middle (2s) and start the dance
    // somehow, delay() doesn't work for addClass()
    setTimeout(function() {
      $(pigArr[Math.floor(pigArr.length / 2)].$node).addClass('pigBattle');
    }, 3000);

    // Take a pause, for this one as well
    $(monkeyArr[Math.floor(monkeyArr.length / 2)].$node).delay(1000).animate(monkeySettings2);

    // wait until animal battlers are in the middle (2s) and start the dance
    setTimeout(function() {
      $(monkeyArr[Math.floor(monkeyArr.length / 2)].$node).addClass('monkeyBattle');
    }, 3000);
  });

  $('.danceAgain').on('click', function(event) {
    for (var i = 0; i < dancers.length; i++) {
      $(dancers[i].$node).addClass('sticker');  // make the dancers dance again
    }
  });

});

// This function makes the animals bigger
// Note that the function needs to be added to the HTML tag (inside $node)
var mouseFunction = function(elem) {
  $(elem).animate({'width': '200px'}).animate({"width": "100px", "position": "absolute"});
};

