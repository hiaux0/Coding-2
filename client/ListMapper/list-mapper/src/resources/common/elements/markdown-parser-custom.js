import MarkdownIt from 'markdown-it';
import defList from 'markdown-it-deflist';
import sub from 'markdown-it-sub';

const markdownIt = MarkdownIt();

markdownIt.use(defList);
markdownIt.use(sub);

let inputSub = 'H~2~0'
let inputDf = 'Term 1 : Definition 1 Term 2 with * inline markup * : Definition 2 { some code, part of Definition 2 } Third paragraph of definition 2.'

const renderMarkdown = (input) => {
  console.log('​renderMarkdown -> markdownIt', markdownIt);
  return markdownIt.render(input); /*?*/
}

function hello_world(tokens, idx, options, env, renderer) {
  console.log(arguments)
  // return renderedHTML;
}

markdownIt.inline.ruler.after('emphasis', 'hello_world', hello_world);

renderMarkdown(inputSub) /*?*/
renderMarkdown(inputDf) /*?*/

export {
  markdownIt,
  renderMarkdown,
}



