
/**
 * @param {string} string original above and translated below, separated by paragraphs
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

    ['original', 'translated'].map((key, index) => {
      lineObject[key] = splitByLang[index].split(' ');
    });

    lyricsMap.set(mapKey++, lineObject)
  });

  return lyricsMap;
}
