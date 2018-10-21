const indexRange = (start, range = 1, step = 1) => {
  start = start === -1 ? 0 : start
  let obj = {length: range};
  return Array.from(obj, (_, i) => start + (i * step));
}

let range = indexRange(0, 100, 0.01); /*?*/


function* getZoomValues(range) {
  yield* range;
}

// let gen = getZoomValues(range)

[1,2,3].reverse() /*?*/