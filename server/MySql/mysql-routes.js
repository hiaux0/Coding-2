const { singleInsertInto, listTable, getEntryByColumn, updateRowByColumn } = require('./api/api-init');

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
    });

  app.get('/lyrics/words', (req, res) => {
    const {words} = req.query;
    getEntryByColumn(pool, { tableName, value: words, columnName: 'original' })
    .then(response => {
      if (response instanceof Error) {
        const notFound = {
          code: 200,
          message: response.message,
          error: true
        }
        return res.status(200).json(notFound);
      }
      return res.json(response)
    });
  });

  app.put('/lyrics/words', (req, res) => {
    const { words } = req.query;

    updateRowByColumn(pool, {
      tableName,
      value: words,
      columnName: 'original',
      data: req.body
    })
      .then(response => {
        res.json(response)
      });
  });

}