var sub = require('markdown-it-sub');
var markdownIt = require('markdown-it');
var md = markdownIt();

md.use(sub)

md.render('H~2~0') /*?*/
