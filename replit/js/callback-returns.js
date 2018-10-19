let consoleCb = () => console.log('hi')


// both do the same, ie. either you return the called function or execture the function inside the body
// let process = () => consoleCb();
let process = () => { consoleCb() };

process()