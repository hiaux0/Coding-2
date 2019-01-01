const apiInit = require('../api/api-init');

const songsTableName = 'songs';

exports.getSong = ((req, res) => {
  const { params } = req;
  console.log("​params", params)
  const { songId } = params;

  apiInit.getEntry({ id: songId, tableName: songsTableName })
    .then(data => {
      res.json(data);
    })
})

exports.postSong = ((req, res) => {
    const {body} = req;
    console.log("body", body)

    apiInit.insert({tableName: songsTableName, data: body})
    .then(data => {
      res.json(data);
    })
  })