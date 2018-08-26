let string = `
<pre><code class="language-js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addClassToListTag</span>(<span class="hljs-params">tokens, idx, options, env, renderer</span>) </span>{
  <span class="hljs-comment">// console.log('​functionhello_world -&gt; tokens', tokens);</span>
  <span class="hljs-keyword">let</span> flatTokens = tokens.tokens; <span class="hljs-comment">/*?*/</span>
  <span class="hljs-comment">// console.log('​addClassToListTag -&gt; flatTokens', flatTokens);</span>
  flatTokens.forEach(<span class="hljs-function">(<span class="hljs-params">token</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (token.type === <span class="hljs-string">'bullet_list_open'</span>) {
      <span class="hljs-comment">// token.attrPush(['sortable', ''])</span>
    }
  })
  <span class="hljs-comment">// return renderedHTML;</span>
}
</code></pre>
`

// let split = string.split(/[\n\r]/g) /*?*/

let filter = string.replace("<pre>", "")
                   .replace("</pre>", "")
                   .replace("</code>", "")
                   .replace(/<code .+>/g, "");

                   
let codeTag = '<code class="language-js">';
// let res = codeTag.replace(/<code class="language-js">/g, "");
let res = codeTag.replace(/<code .+>/g, "");
res /*?*/