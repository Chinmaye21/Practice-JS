// 1
// Input
function sayHi() {
    console.log(name);
    // console.log(age);
    var name = 'Lydia';
    let age = 21;
}  
sayHi();

// Output
// undefined
// ReferenceError: Cannot access 'age' before initialization

// Comment
/* Within the function, we first declare the name variable with the var keyword. 
This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of undefined, until we actually get to the line where we define the variable. 
We haven't defined the variable yet on the line where we try to log the name variable, so it still holds the value of undefined.

Variables with the let keyword (and const) are hoisted, but unlike var, don't get initialized. 
They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". 
When we try to access the variables before they are declared, JavaScript throws a ReferenceError. */

// 2
// Input
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}
  
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1);
}

// Output
// 3
// 3
// 3
// 0
// 1
// 2

// Comment
// Because of the event queue in JavaScript, the setTimeout callback function is called after the loop has been executed. Since the variable i in the first loop was declared using the var keyword, this value was global. During the loop, we incremented the value of i by 1 each time, using the unary operator ++. By the time the setTimeout callback function was invoked, i was equal to 3 in the first example.

// In the second loop, the variable i was declared using the let keyword: variables declared with the let (and const) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a new value, and each value is scoped inside the loop.

// 3
// Input
const shape = {
    radius: 10,
    diameter() {
      return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius,
};  
console.log(shape.diameter());
console.log(shape.perimeter());

// Output:
// 20
// NaN

// Comment
// Note that the value of diameter is a regular function, whereas the value of perimeter is an arrow function.

// With arrow functions, the this keyword refers to its current surrounding scope, unlike regular functions! This means that when we call perimeter, it doesn't refer to the shape object, but to its surrounding scope (window for example).

// There is no value radius on that object, which returns NaN.

// 4
// Input
console.log(+true, true);
console.log(!'Lydia', 'Lydia');

// Output
// 1 true
// false Lydia

// Comment
// The unary plus tries to convert an operand to a number. true is 1, and false is 0.

// The string 'Lydia' is a truthy value. What we're actually asking, is "is this truthy value falsy?". This returns false.

// 5
// Input
const bird = {
    size: 'small',
};
  
const mouse = {
    name: 'Mickey',
    small: true,
};

// Output
console.log("mouse.bird.size not vaild" );
console.log(mouse[bird.size], "valid");
console.log(mouse[bird["size"]], "valid");

// Comment
// In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood.

// JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement.

// mouse[bird.size]: First it evaluates bird.size, which is "small". mouse["small"] returns true

// However, with dot notation, this doesn't happen. mouse does not have a key called bird, which means that mouse.bird is undefined. Then, we ask for the size using dot notation: mouse.bird.size. Since mouse.bird is undefined, we're actually asking undefined.size. This isn't valid, and will throw an error similar to Cannot read property "size" of undefined.

// 6
// Input
let cd = { greeting: 'Hey!' };
let dd;

dd = cd;
cd.greeting = 'Hello';
console.log(dd.greeting);

// Output

// Hello

// Comment
// In JavaScript, all objects interact by reference when setting them equal to each other.

// First, variable c holds a value to an object. Later, we assign d with the same reference that c has to the object.


// When you change one object, you change all of them.

// 7
// Input
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a, b, c);
console.log(a == b);
console.log(a === b);
console.log(b === c);

// Output
// 3, [Number: 3], 3
// true
// false
// false

// Comment
// new Number() is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.

// When we use the == operator (Equality operator), it only checks whether it has the same value. They both have the value of 3, so it returns true.

// However, when we use the === operator (Strict equality operator), both value and type should be the same. It's not: new Number() is not a number, it's an object. Both return false.

// 8
// Input
class Chameleon {
    static colorChange(newColor) {
      this.newColor = newColor;
      return this.newColor;
    }
  
    constructor({ newColor = 'green' } = {}) {
      this.newColor = newColor;
    }
  }
  
  const freddie = new Chameleon({ newColor: 'purple' });
//   console.log(freddie.colorChange('orange'));

// Output
// TypeError: freddie.colorChange is not a function

// Comment
// The colorChange function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since freddie is an instance of class Chameleon, the function cannot be called upon it. A TypeError is thrown.

// 9
// Input
let greeting;
greetign = {}; // Typo!
console.log(greetign);
// Output
// {}
// Comment
// It logs the object, because we just created an empty object on the global object! When we mistyped greeting as greetign, the JS interpreter actually saw this as:

// global.greetign = {} in Node.js
// window.greetign = {}, frames.greetign = {} and self.greetign in browsers.
// self.greetign in web workers.
// globalThis.greetign in all environments.
// In order to avoid this, we can use "use strict". This makes sure that you have declared a variable before setting it equal to anything.

// 10
// Input
function bark() {
    console.log('Woof!');
    return true;
  }
  
  bark.animal = 'dog';
  console.log("bark",typeof bark, bark)
// Output
// bark function [Function: bark] { animal: 'dog' }
// Comment
// This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)

// A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.

// 11
// Input
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  const member = new Person('Lydia', 'Hallie');
  Person.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };
  
//   console.log(member.getFullName());
// Output
// TypeError: member.getFullName is not a function
// Comment
// In JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor function object itself. For that reason, we can call Person.getFullName(), but member.getFullName throws a TypeError.

// If you want a method to be available to all object instances, you have to add it to the prototype property:

// Person.prototype.getFullName = function() {
//   return `${this.firstName} ${this.lastName}`;
// };

// 12
// Input
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  const lydia = new Person('Lydia', 'Hallie');
  const sarah = Person('Sarah', 'Smith');
  
  console.log(lydia);
  console.log(sarah);

// Output
// Person { firstName: 'Lydia', lastName: 'Hallie' }
// undefined

// Comment
// For sarah, we didn't use the new keyword. When using new, this refers to the new empty object we create. However, if you don't add new, this refers to the global object!

// We said that this.firstName equals "Sarah" and this.lastName equals "Smith". What we actually did, is defining global.firstName = 'Sarah' and global.lastName = 'Smith'. sarah itself is left undefined, since we don't return a value from the Person function.

// 13
// Input
// What are the three phases of event propagation?
// A: Target > Capturing > Bubbling
// B: Bubbling > Target > Capturing
// C: Target > Bubbling > Capturing
// D: Capturing > Target > Bubbling
// Output
// D: Capturing > Target > Bubbling
// Comment
// During the capturing phase, the event goes through the ancestor elements down to the target element. It then reaches the target element, and bubbling begins.



// 14
// Input
// All object have prototypes.
// A: true
// B: false
// Output
// Comment
// All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the new keyword. 
// The base object has access to some methods and properties, such as .toString. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. 
// Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.

// 15
// Input
function sum(a, b) {
    return a + b;
  }
console.log(sum(1, '2'));

// Output
// 12

// Comment
// JavaScript is a dynamically typed language: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another.

// In this example, JavaScript converts the number 1 into a string, in order for the function to make sense and return a value. During the addition of a numeric type (1) and a string type ('2'), the number is treated as a string. We can concatenate strings like "Hello" + "World", so what's happening here is "1" + "2" which returns "12".

// 16
// Input
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);

// Output
0
2
2

// Comment
/* The postfix unary operator ++:

Returns the value (this returns 0)
Increments the value (number is now 1)
The prefix unary operator ++:

Increments the value (number is now 2)
Returns the value (this returns 2)
This returns 0 2 2. */

// 17
// Input
function getPersonInfo(one, two, three) {
    console.log(one);
    console.log(two);
    console.log(three);
  }
  
  const person = 'Lydia';
  const age = 21;
  
  getPersonInfo`${person} is ${age} years old`;
  
// Output
/* [ '', ' is ', ' years old' ]
Lydia
21
*/

// Comment
// If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!

// 18
// Input
function checkAge(data) {
    if (data === { age: 18 }) {
      console.log('You are an adult!');
    } else if (data == { age: 18 }) {
      console.log('You are still an adult.');
    } else {
      console.log(`Hmm.. You don't have an age I guess`, data);
    }
  }
  
  checkAge({ age: 18 });
// Output
// Hmm.. You don't have an age I guess { age: 18 }

// Comment
/* When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory.

The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.

This is why both { age: 18 } === { age: 18 } and { age: 18 } == { age: 18 } return false. */


// 19
// Input
function getAge(...args) {
    console.log(typeof args);
  }
  
  getAge(21);

// Output
// object

// Comment
// The rest parameter (...args) lets us "collect" all remaining arguments into an array. An array is an object, so typeof args returns "object"

// 20
// Input
function getAge() {
    'use strict';
    // age = 21;
    console.log(age);
  }
  
  getAge();

// Output
// ReferenceError: age is not defined

// Comment
// With "use strict", you can make sure that you don't accidentally declare global variables. We never declared the variable age, and since we use "use strict", it will throw a reference error. If we didn't use "use strict", it would have worked, since the property age would have gotten added to the global object.

// 21
// Input

const sum1 = eval('10*10+5');
console.log("sum", sum1);

// Output
// sum 105

// Comment
// eval evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is 10 * 10 + 5. This returns the number 105.

// 22
// Input
// sessionStorage.setItem('cool_secret', 123);

// Output
// When the user closes the tab.

// Comment
// The data stored in sessionStorage is removed after closing the tab.
// If you used localStorage, the data would've been there forever, unless for example localStorage.clear() is invoked.

// 23
// Input
var num2 = 8;
var num2 = 10;

console.log(num2);
// Output
// 10

// Comment
// With the var keyword, you can declare multiple variables with the same name. The variable will then hold the latest value.

// You cannot do this with let or const since they're block-scoped and therefore can't be redeclared.

// 24
// Input
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

console.log(obj.hasOwnProperty('1'),
obj.hasOwnProperty(1),
set.has('1'),
set.has(1));

// Output
// true true false true

// Comment
/* All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. 
This is why obj.hasOwnProperty('1') also returns true.
It doesn't work that way for a set. There is no '1' in our set: set.has('1') returns false. It has the numeric type 1, set.has(1) returns true.*/


// 25
// Input
const obj3 = { a: 'one', b: 'two', a: 'three' };
console.log(obj3);

// Output
// { a: 'three', b: 'two' }

// Comment
// If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.


// 26
// Input
// The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.
// Output

// Comment

// 27
// Input
for (let i = 1; i < 5; i++) {
    if (i === 3) continue;
    console.log(i);
  }

// Output
// 1 2 4

// Comment
// The continue statement skips an iteration if a certain condition returns true.

// 28
// Input
String.prototype.giveLydiaPizza = () => {
    return 'Just give Lydia pizza already!';
  };
  
  const name = 'Lydia';
  
  console.log(name.giveLydiaPizza())

// Output
// Just give Lydia pizza already!

// Comment
// String is a built-in constructor, which we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!

// 29
// Input
const a1 = {};
const b1 = { key: 'b' };
const c1 = { key: 'c' };

a1[b1] = 123;
a1[c1] = 456;

console.log(a1[b1]);

// Output
// 456

// Comment
/*Object keys are automatically converted into strings. We are trying to set an object as a key to object a, with the value of 123.

However, when we stringify an object, it becomes "[object Object]". So what we are saying here, is that a["[object Object]"] = 123. Then, we can try to do the same again. c is another object that we are implicitly stringifying. So then, a["[object Object]"] = 456.

Then, we log a[b], which is actually a["[object Object]"]. We just set that to 456, so it returns 456.*/


// 30
// Input
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();

// Output
// First
// Third
// Second

// Comment

// 31
// Input
{/* <div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div> */}
// Output
// What is the event.target when clicking the button?
// button

// Comment
// The deepest nested element that caused the event is the target of the event. You can stop bubbling by event.stopPropagation

// 32
// Input
{/* <div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div> */}

// Output
// When you click the paragraph, what's the logged output?
// p div

// Comment
// If we click p, we see two logs: p and div. During event propagation, there are 3 phases: capturing, target, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set useCapture to true). It goes from the deepest nested element outwards.

// 33
// Input
const person2 = { name: 'Lydia' };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person2, 21));
console.log(sayHi.bind(person2, 21));

// Output
// Lydia is 21
// [Function: bound sayHi]

// Comment
// With both, we can pass the object to which we want the this keyword to refer to. However, .call is also executed immediately!

// .bind. returns a copy of the function, but with a bound context! It is not executed immediately.

// 34
// Input
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());

// Output
// "number"

// Comment
// The sayHi function returns the returned value of the immediately invoked function expression (IIFE). This function returned 0, which is type "number".

// FYI: typeof can return the following list of values: undefined, boolean, number, bigint, string, symbol, function and object. Note that typeof null returns "object".

// 35
// Input
// Which of these values are falsy?
// 0;
// new Number(0);
// ('');
// (' ');
// new Boolean(false);
// undefined;

// Output
// 0, '', undefined

// Comment
// There are 8 falsy values:

// undefined
// null
// NaN
// false
// '' (empty string)
// 0
// -0
// 0n (BigInt(0))
// Function constructors, like new Number and new Boolean are truthy.

// 36
// Input
console.log(typeof typeof 1);

// Output
// string

// Comment
// typeof 1 returns "number". typeof "number" returns "string"

// 37
// Input
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);

// Output
// [ 1, 2, 3, <7 empty items>, 11 ]

// Comment
// When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of undefined, but you will see something like:
// [1, 2, 3, empty x 7, 11]
// depending on where you run it (it's different for every browser, node, etc.)

// 38
// Input
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();

// Output
// 1
// undefined
// 2

// Comment
// The catch block receives the argument x. This is not the same x as the variable when we pass arguments. This variable x is block-scoped.

// Later, we set this block-scoped variable equal to 1, and set the value of the variable y. Now, we log the block-scoped variable x, which is equal to 1.

// Outside of the catch block, x is still undefined, and y is 2. When we want to console.log(x) outside of the catch block, it returns undefined, and y returns 2.


// 39
// Input
// JavaScript only has primitive types and objects.

// Output

// Comment
// Primitive types are boolean, null, undefined, bigint, number, string, and symbol.
// What differentiates a primitive from an object is that primitives do not have any properties or methods; 
// however, you'll note that 'foo'.toUpperCase() evaluates to 'FOO' and does not result in a TypeError. 
// This is because when you try to access a property or method on a primitive like a string, 
// JavaScript will implicitly wrap the primitive type using one of the wrapper classes, i.e. String, 
// and then immediately discard the wrapper after the expression evaluates. All primitives except for null and undefined exhibit this behaviour.



// 40
// Input
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);

// Output
// [ 1, 2, 0, 1, 2, 3 ]

// Comment
// [1, 2] is our initial value. This is the value we start with, and the value of the very first acc. During the first round, acc is [1,2], and cur is [0, 1]. We concatenate them, which results in [1, 2, 0, 1].
// Then, [1, 2, 0, 1] is acc and [2, 3] is cur. We concatenate them, and get [1, 2, 0, 1, 2, 3]

// 41
// Input
console.log(!!null,
  !!'',
  !!1)

// Output
// false false true

// Comment
// null is falsy. !null returns true. !true returns false.
// "" is falsy. !"" returns true. !true returns false.
// 1 is truthy. !1 returns false. !false returns true.

// 42
// Input
// What does the setInterval method return in the browser?
// setInterval(() => console.log('Hi'), 1000);

// Output

// Comment
// It returns a unique id. This id can be used to clear that interval with the clearInterval() function.

// 43
// Input
// [...'Lydia'] => ["L", "y", "d", "i", "a"]
// Output

// Comment
// A string is an iterable. The spread operator maps every character of an iterable to one element.

// 44
// Input
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);

// Output
// 10
// 20

// Comment
// Regular functions cannot be stopped mid-way after invocation. However, a generator function can be "stopped" midway, and later continue from where it stopped. Every time a generator function encounters a yield keyword, the function yields the value specified after it. Note that the generator function in that case doesn’t return the value, it yields the value.

// First, we initialize the generator function with i equal to 10. We invoke the generator function using the next() method. The first time we invoke the generator function, i is equal to 10. It encounters the first yield keyword: it yields the value of i. The generator is now "paused", and 10 gets logged.

// Then, we invoke the function again with the next() method. It starts to continue where it stopped previously, still with i equal to 10. Now, it encounters the next yield keyword, and yields i * 2. i is equal to 10, so it returns 10 * 2, which is 20. This results in 10, 20.

// 45
// Input
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));

// Output
// two

// Comment
// When we pass multiple promises to the Promise.race method, it resolves/rejects the first promise that resolves/rejects. 
// To the setTimeout method, we pass a timer: 500ms for the first promise (firstPromise), and 100ms for the second promise (secondPromise). 
// This means that the secondPromise resolves first with the value of 'two'. res now holds the value of 'two', which gets logged.

// 46
// Input
let person3 = { name: 'Lydia' };
const members = [person3];
person3 = null;

console.log(members);
// Output
// [ { name: 'Lydia' } ]

// Comment

// 47
// Input
const person4 = {
  name: 'Lydia',
  age: 21,
};

for (const item in person4) {
  console.log(item);
}
// Output
// name
// age

// Comment
/* With a for-in loop, we can iterate through object keys, in this case name and age. 
Under the hood, object keys are strings (if they're not a Symbol). 
On every loop, we set the value of item equal to the current key it’s iterating over. 
First, item is equal to name, and gets logged. Then, item is equal to age, which gets logged. */


// 48
// Input
console.log(3 + 4 + '5');

// Output
// 75

// Comment
// Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the same precedence. We only have one type of operator: +. For addition, the associativity is left-to-right.
// 3 + 4 gets evaluated first. This results in the number 7.
// 7 + '5' results in "75" because of coercion. JavaScript converts the number 7 into a string, see question 15. We can concatenate two strings using the +operator. "7" + "5" results in "75".

// 49
// Input
const num = parseInt('7*6', 10);
console.log("num", num)

// Output
// 7

// Comment
// Only the first numbers in the string is returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), 
// the parseInt checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters.
// "*" is not a valid number. It only parses "7" into the decimal 7. num now holds the value of 7.

// 50
// Input
let temp = [1, 2, 3];
temp.map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});

// Output
// [undefined, undefined, undefined]

// Comment
// When mapping over the array, the value of num is equal to the element it’s currently looping over. In this case, the elements are numbers, so the condition of the if statement typeof num === "number" returns true. 
// The map function creates a new array and inserts the values returned from the function.
// However, we don’t return a value. When we don’t return a value from the function, the function returns undefined. For every element in the array, the function block gets called, so for each element we return undefined.

































  