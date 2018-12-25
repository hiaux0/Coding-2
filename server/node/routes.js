module.exports = function (app) {
  const { getDepTree } = require('../features/dependency-tree.controller');


  // DEPENDENCY TREE
  app.route('/dep-tree')
    .get((req, res) => {
      return res.json(getDepTree());
    })

}