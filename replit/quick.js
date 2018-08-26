let string = `
<pre><code class="language-js"><span class="hljs-function"><span
}
</code></pre>
`


let filter = string.replace("</code></pre>", "")
                   .replace(/<pre><code (.*?)>/g, "");

filter /*?*/
let split = filter.split(/[\n\r]/g)
split /*?*/
