// Taken from http://jdanyow.github.io/aurelia-converters-sample/

/**
 * Sort a custom element according
 */
export class SortValueConverter {
  toView(array, direction) {;
    let factor = direction === 'ascending' ? 1 : -1;
    // TODO jkn0svqm : Now, we assume that we sort sth like [{position: 0}, {position: 1}],
    // ie. array of objects. TODO is to generalize this into arbitry array

    return array
      .slice(0)
      .sort((a, b) => {``
        return (a.position - b.position) * factor
      });
  }
}


