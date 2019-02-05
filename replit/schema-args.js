const treeSchema = {
  name: 'al',
  age: 'infinity',
  city: 'none'
}

function foo() {
    treeSchema.name = 'world';
    bar({...treeSchema})
  }

function bar({
  name, age, city
}) {
  console.log("​Tree -> city", city)
  console.log("​Tree -> age", age)
  console.log("​Tree -> name", name)
}

foo() /*?*/