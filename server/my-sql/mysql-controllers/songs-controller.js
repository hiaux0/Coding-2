const apiInit = require('../api/api-init');
const { tokenizeLyrics } = require('../lyrics/tokenize-lyrics');

const tableName = 'songs';

exports.listSongs = ((req, res) => {
  apiInit.listEntries({tableName})
    .then(lyricEntries => {
      lyricEntries.forEach(entry => {
        entry.lyrics = JSON.parse(entry.lyrics);
      })
      // todo auto formatter to pares json (also use it in `getEntry`)
      res.json(lyricEntries);
    })
})

exports.getSong = ((req, res) => {
  const { songId } = req.params;

  apiInit.getEntry({ id: songId, tableName })
    .then(lyricsEntry => {
      // is saved as string in database, thus need to convert.
      lyricsEntry[0].lyrics = JSON.parse(lyricsEntry[0].lyrics);
      res.json(lyricsEntry);
    })
})

exports.postSong = ((req, res) => {
  const {lyrics} = req.body;
  let lyricsMap = tokenizeLyrics(lyrics);
  let lyricsData = Array.from(lyricsMap);
  lyricsData = JSON.stringify(lyricsData);

  apiInit.insert({ tableName, data: {
    lyrics: lyricsData
  }})
    .then(data => {
      res.json(data);
    })
  })