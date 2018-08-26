import MarkdownIt from 'markdown-it';
import defList from 'markdown-it-deflist';
import sub from 'markdown-it-sub';
import container from 'markdown-it-container'
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

// Configure code highlighting
const markdownIt = MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        let result = hljs.highlight(lang, str).value;
        console.log('​result', result);
        return result;
      } catch (__) { }
    }
    return ''; // use external default escaping
  }
});

// const markdownIt = MarkdownIt();

// Container
markdownIt.use(container, 'name');
markdownIt.use(container, 'spoiler', {

  validate: function (params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },

  render: function (tokens, idx) {
    var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + markdownIt.utils.escapeHtml(m[1]) + '</summary>\n';

    } else {
      // closing tag
      return '</details>\n';
    }
  }
});

// Definition list plugin
markdownIt.use(defList);
// Subscript plugin
markdownIt.use(sub);

// Custom plugin
markdownIt.core.ruler.push('addClassToListTag', addClassToListTag);


// let inputSub = 'H~2~0'
// let inputDf = 'Term 1 : Definition 1 Term 2 with * inline markup * : Definition 2 { some code, part of Definition 2 } Third paragraph of definition 2.'
let inputList = "- hello"
let inputContainer = '::: spoiler click me\n*content*\n:::\n';

const renderMarkdown = (input) => {
  console.log('​renderMarkdown -> markdownIt', markdownIt);
  let result = markdownIt.render(input);
  return result;
}

function addClassToListTag(tokens, idx, options, env, renderer) {
  // console.log('​functionhello_world -> tokens', tokens);
  let flatTokens = tokens.tokens; /*?*/
  // console.log('​addClassToListTag -> flatTokens', flatTokens);
  flatTokens.forEach((token) => {
    if  (token.type === 'bullet_list_open') {
      // token.attrPush(['sortable', ''])
    }
  })
  // return renderedHTML;
}

renderMarkdown(inputContainer) /*?*/
// renderMarkdown(inputList) /*?*/
// renderMarkdown(inputSub) /*?*/
// renderMarkdown(inputDf) /*?*/

export {
  markdownIt,
  renderMarkdown,
}



  // - Implement a global `commandManager`
  //   ✘ Aurelia storage @cancelled (2018-8-12 00:33:07)
  //   - event aggregator <-- For now