function Person() { }
Person.prototype.getName = function () {
  return this.name;
};

// Implement a function that inherits from Person
// and sets a name in the constructor
function Me() {
  this.name = "Hio";
}
Me.prototype = new Person/*?*/

var me = new Me();
me.getName() /*?*/
// assert(me.getName(), "A name was set.");

for (let i in me) {
  console.log(i)
}

// We extended the prototype of Person. Then create a new object Me, whose prototype was set to Person.
// Now a new instance of Me, ie. `me` has not only `name` property, but also `getName` method defined in Person.
// --> Prototype chain

// function Bar(x,y) {
//   this.x = x;
//   this.y = y;
// }


// Bar.prototype.getX = function getX() {
//   this /*?*/
//   return this.x;
// }

// Bar.prototype.getY = function getY() {
//   this /*?*/
//   return this.y;
// }

// let foo = new Bar(1,2)
// foo.getX() /*?*/
// foo.getY() /*?*/

// foo.prototype /*?*/
// Bar.prototype /*?*/

// foo.__proto__ /*?*/
// Bar.__proto__ /*?*/

// // How do I give foo a prototype?
// // I want foo to inherit from Bar, but change the `getX` method

// foo.prototype = new Bar /*?*/
// foo.prototype.getX = function getX() {
//   thix /*?*/
//   return -this.x
// }
// foo.getX() /*?*/


// https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript 

function Point(x, y) {
  this.x = x;
  this.y = y;

  this.getX = () => {
    return this.x;
  }
}

Point.prototype /*?*/

var myPoint = new Point(1,2);
console.log('TCL: myPoint', myPoint);

// the following are all true
myPoint.__proto__ == Point.prototype /*?*/
myPoint.__proto__.__proto__ == Object.prototype /*?*/
myPoint instanceof Point; /*?*/
myPoint instanceof Object; /*?*/

// Using classes

class PointClass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x
  }
}

let myPointClass = new PointClass(1, 2);
console.log('TCL: PointClass.prototype', PointClass.prototype);
console.log('TCL: myPointClass', myPointClass);
console.log('TCL: myPointClass.__proto__', myPointClass.__proto__);
console.log('TCL: myPointClass.prototype', myPointClass.prototype);
myPointClass.__proto__ == PointClass.prototype /*?*/
myPointClass.__proto__.__proto__ == Object.prototype /*?*/
myPointClass instanceof Point; /*?*/
myPointClass instanceof Object; /*?*/

// ADditional ressource https://css-tricks.com/understanding-javascript-constructors/

/////////////////
Object.prototype.keys = function () {
  var keys = [];
  this /*?*/
  this.prototype /*?*/
  this.__proto__ /*?*/
  for (let i in this) {
    i /*?*/
    keys.push(i);
  }
  keys /*?*/
  return keys;
};

var obj = { a: 1, b: 2, c: 3 };

obj.keys().length === 3 /*?*/
// console.log('​obj.keys().', obj.keys());
delete Object.prototype.keys


// QUESTIONS
/**
 * 1. What is the prototype chain in Javascript?
 *  1.1. prototype
 *  1.2. __proto__
 *  1.3. [[Prototype]]
 * 2. What happens on creation of new instance?
 * 3. What is a constructor function?
 * 4. 
 */

