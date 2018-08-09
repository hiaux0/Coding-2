let init = [

  {
    "command": "Command-a :",
    "position": 1
  },
  {
    "command": "Command-b :",
    "position": 2
  },
  {
    "command": "Command-c :",
    "position": 3
  },
  {
    "command": "Command-d :",
    "position": 4
  },
  {
    "command": "Command-e :",
    "position": 5
  },
  {
    "command": "Command-f :",
    "position": 6
  },
  {
    "command": "Command-g :",
    "position": 7
  },
  {
    "command": "Command-h :",
    "position": 8
  },
  {
    "command": "Command-i :",
    "position": 9
  },
  {
    "command": "Command-j :",
    "position": 10
  },
  {
    "command": "Command-k :",
    "position": 11
  },
  {
    "command": "Command-l :",
    "position": 12
  },
  {
    "command": "Command-m :",
    "position": 13
  },
  {
    "command": "Command-n :",
    "position": 14
  },
]

/**
 * Takes in 2 objects with an orde property, and sorts them according to that position.
 * 
 * @param {Object} a - object with position property
 * @param {Object} b - object with position property
 */
const comparePosition = (a,b) => {
  console.log(a)
  return a.position - b.position;
}
init.sort(comparePosition); /*?*/



// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].sort(comparePosition) /*?*/