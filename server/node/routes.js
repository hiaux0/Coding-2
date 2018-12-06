module.exports = function (app) {
  app.route('/dep-tree')
    .get((req, res) => {
      return res.json('hello, world');
    })
}