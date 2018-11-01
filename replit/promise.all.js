let p = Promise.resolve(3);
p

/*?*/

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});

function waitForGreeting(greeting) {
  return new Promise(resolve => {
    resolve(greeting);
  });
}
function waitForBye(bye) {
  return new Promise(resolve => {
    resolve(bye);
  });
}
let sayHelloLater = waitForGreeting("Hello");
console.log('TCL: sayHelloLater', sayHelloLater);
let sayByeLater = waitForBye("Bye");

Promise.all([sayHelloLater, sayByeLater]).then(values => {
  console.log(values)
});