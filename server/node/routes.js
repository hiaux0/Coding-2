module.exports = function (app) {
  const { getDepTree } = require('../features/dependency-tree.controller');
  const { translate } = require('./lang-translator/lang-translator');

  // DEPENDENCY TREE
  app.route('/dep-tree')
    .get((req, res) => {
      return res.json(getDepTree());
    })

  // LANGUAGE TRANSLATOR
  app.route('/translate')
    .post((req, res) => {
      res.json(translate('todo response from BE'));
    });

  app.route('/translate/:text')
    .get((req, res) => {
      const params = req.params;
      const result = translate(params.text);
      result.then(data => {
        res.json(data);
      })
    });
}