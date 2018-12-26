const { singleInsertInto, listTable } = require('./api/api-init');

module.exports = function(app, pool) {
  const tableName = 'lyricTest';

  app.get('/lyrics', (_, res) => {
    listTable(pool, tableName).then(response => res.json(response));
  });

  app.route('/lyrics')
    .post((req, res) => {
      const body = req.body;
      singleInsertInto(pool, tableName, body)
        .then(data => {
          if (data.errno === 1062) throw new Error('ER_DUP_ENTRY');
          res.json(data);
        })
        .catch(err => res.json(err.message));
    })
}