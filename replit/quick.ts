let string: string = `
        <span id='hello okay'
          class="hio-border zoom-ex-1"
          enable-zooming="context: .zoom-ex-1"
        >Zoom me</span>
`

let splittedAfterNewLine: string = string.split('\n');
let noEmptyLines: string = splittedAfterNewLine.filter(line => line !== '');
noEmptyLines[0] /*?*/


let numOfTopLevelWhiteSpace: string = noEmptyLines[0].match(/(\s)/) /*?*/
console.log("​numOfTopLevelWhiteSpace", numOfTopLevelWhiteSpace)

let numOfTopLevelWhiteSpace: string = noEmptyLines[0].split(/\s/) /*?*/

let res = /\s/.exec(noEmptyLines[0]) /*?*/

let trimmedLines: string[] = noEmptyLines.map(line => {
  return line.substring(numOfTopLevelWhiteSpace);
});

// trimmedLines
let joined: string = trimmedLines
                      .join()
                      .replace(/,/g, '\n')

