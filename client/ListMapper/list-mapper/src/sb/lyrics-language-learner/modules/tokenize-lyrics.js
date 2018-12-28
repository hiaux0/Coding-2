
/**
 * @param {string} string original above and translation below, separated by paragraphs
 *  당신의 웃음 꽃 피우길 피우길x3
 *  Just to see your blooming smile again x3
 * @returns {Map<number, Object>}
 */
export const tokenizeLyrics = (lyrics) => {
  const splitByParagraph = lyrics.split('\n\n');
  let mapKey = 0;
  const lyricsMap = new Map();

  splitByParagraph.map(line => {
    const lineObject = {}
    const splitByLang = line.split('\n');

    ['original', 'translation'].map((key, index) => {
      lineObject[key] = splitByLang[index].split(' ');
    });

    lyricsMap.set(mapKey++, lineObject)
  });

  return lyricsMap;
}
