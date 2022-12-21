function Dog(name, color, numLegs) {
  this.name = name;
  this.color = color;
  this.numLegs = numLegs;
}

let myDog = new Dog('Smokey', 'black', 4)
console.log(mydog)

// capitalised methods indicate a constructor function. This sets the qualities for a new JS Object.
// You call the constructor function with 'new' keyword.


myDog instanceof Dog; // returns true.

// you can also use a constructor method:

myDog.constructor === Dog // true

// ---------------------------------

function Bird(name) {
  this.name = name;
  this.numLegs = 2;
}

let canary = new Bird("Tweety");
let ownProps = [];

for (let property in canary) {
  if(canary.hasOwnProperty(property)) {
    ownProps.push(property);
  }
}

// own properties are properties defined directly on the instance, as opposed to properties inherited from the object class or the prototype.

Bird.prototype.numLegs = 2;

// adds the property and value numlegs = 2 to every single instance of the Bird class.

// The following code creates sends the own properties and the prototype properties to two different arrays:

for (let property in beagle) {
  if (beagle.hasOwnProperty(property)) {
    ownProps.push(property);
  } else {
    prototypeProps.push(property);
  }
}

// by manually setting  the prototype, you remove the constructor property:

Dog.prototype = {

  numLegs: 4,
  eat: function() {
    console.log("nom nom nom");
  },
  describe: function() {
    console.log("My name is " + this.name);
  }
};

// now: Dog.constructor === Object // true
// you need to add it manually to the dog prototype:

Dog.prototype = {
  constructor: Dog //this allows you to use the Dog constructor method to make instances of Dog
}

// Dog.prototype is the prototype of myDog, and Object.prototype is the prototype of Dog.prototype
// Object.prototype includes all js object methods, which can then be called on instances of Dog



// -------------------------------------------------
// inheritance

// You can set the prototype of Dog to be the same as the prototype of a superclass called Animal
// this allows dog to inherit the properties of animal

function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }

Dog.prototype = Object.create(Animal.prototype); // new instances of dog will have the same properties as the animal prototype.

let beagle = new Dog();


// -------------
// mixins can assign functions to objects. birds and planes can both fly, but they are not children/parents of one another.

let flyMixin = function(obj) {
  obj.fly = function() {
    console.log("Flying, wooosh!");
  }
};

// this takes an object and assigns it the fly function. If you call this function with a bird object, it will then contain the fly function.


(function () {
  console.log("Chirp, chirp!");
})();

// this is an immediately invoked function expression
// it has no name, and is called immediately by the parentheses() after the function at the end - the second yellow set above
// it is made anonymous by the parentheses around the function itself - the 1st yellow set above
