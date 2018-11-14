
function fizzBuzz(num: Number): string {
  if (num % 3 === 0 && num % 5 === 0) return 'fizzBuzz'
  if (num % 5 === 0) return 'buzz'
  if (num % 3 === 0) return 'fizz'
  return num.toString();
}

for (let i: Number = 0; i < 31; i++) {
  let res = fizzBuzz(i)
  console.log(res)
}