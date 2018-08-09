// Taken from http://jdanyow.github.io/aurelia-converters-sample/


export class SortValueConverter {
  toView(array, propertyName, direction) {;
    console.log('​SortValueConverter -> toView -> direction', direction);
    console.log('​SortValueConverter -> toView -> propertyName', propertyName);
    console.log('​SortValueConverter -> toView -> array', array);
    var factor = direction === 'ascending' ? 1 : -1;
    return array
      .slice(0)
      .sort((a, b) => {
        return (a.position - b.position) * factor
      });
  }
}

