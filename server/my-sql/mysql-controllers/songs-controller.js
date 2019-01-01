
exports.getSong = ((req, res) => {
  const { params } = req;
  console.log("​params", params)
  const { songId } = params;

  getEntry({ id: songId, tableName: songLyricsName })
    .then(data => {
      res.json(data);
    })
})

exports.postSong = ((req, res) => {
    const {body} = req;
		console.log("body", body)

    insert({tableName: songLyricsName, data: body})
    .then(data => {
      res.json(data);
    })
  })