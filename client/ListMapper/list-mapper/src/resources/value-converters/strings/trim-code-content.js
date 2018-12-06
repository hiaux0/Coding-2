
/**
 * Given a multi line string, remove all empty lines and trim the beginning white
 * spaces in a way, that keeps the indentation.
 *
 * @example
 * '
 *       <span>
 *         <h1>
 *           Hello
 *         </h1>
 *       </span>
 * '
 * -->
 * '<span>
 *   <h1>
 *     Hello
 *   </h1>
 * </span>'
 */
export class TrimCodeConentValueConverter {
  toView(string) {
    let splittedAfterNewLine = string.split('\n');
    let noEmptyLines = splittedAfterNewLine.filter(line => line !== '');

    let numOfTopLevelWhiteSpace = noEmptyLines[0].search(/\S/);

    let trimmedLines = noEmptyLines.map(line => {
      return line.substring(numOfTopLevelWhiteSpace);
    });

    let res = trimmedLines
              .join()
              .replace(/,/g, '\n');
    return res;
  }
}
