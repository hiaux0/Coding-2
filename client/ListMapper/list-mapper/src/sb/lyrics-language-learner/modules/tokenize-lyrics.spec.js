const { tokenizeLyrics } = require('./tokenize-lyrics');

const lyrics = `바쁘게 살아온 당신의 젊음에 의미를 더해줄 아이가 생기고
In your busy youth, you had a child who would lend purpose to your life.

그 날의 찍었던 가족사진 속에 설레는 웃음은 빛바래 가지만
Even though the excited smiles in the family portrait we took that day are fading

어른이 되어서 현실에 던져진 나는 철이 없는 아들 딸이 되어서
Thrown in to the real world, I ended up becoming a child who’d lost its way

이곳저곳에서 깨지고 또 일어서다 외로운 어느날 꺼내본 사진 속 아빠를 닮아있네
One lonely day, after falling down and getting back up again in countless places, I looked back at that family portrait and realized that I resembled my father

.내 젊을 어느 새 기울어 갈때 쯤 그제야 보이는 당신의 날 들이
As my youth fades away, only now can I see the life you lived.

가족사진속에 미소 띤 젊은 우리 엄마 꽃피던 시절은 나에게 다시 돌아와서
My young mother, smiling in the family portrait. I remember the days when the picture was taken

나를 꽃피우기위해 거름이 되어버렸던 그을린 그 시간들을 내가 깨끗이 모아서
I will collect the ashes of all the time you spent, like fertilizer to help me blossom,

당신의 웃음 꽃 피우길 피우길x3
Just to see your blooming smile again x3

나를 꽃피우기위해 거름이 되어버렸던 그을린 그 시간들을 내가 깨끗이 모아서
I will collect the ashes of all the time you spent, like fertilizer to help me blossom,

당신의 웃음 꽃 피우길 피우길x3
Just to see your blooming smile again x3`

describe('tokenizeLyrics', () => {
  const lyricsMap = tokenizeLyrics(lyrics);

  it('Should split up correct number of lines', () => {
    expect(lyricsMap.size).toBe(10);
  });

  it('Should split up words correctly', () => {
    expect(lyricsMap.get(0).original.length).toBe(8);
    expect(lyricsMap.get(0).translated.length).toBe(15);
  });

  it('Should split up lines correctly into array of words', () => {
    expect(JSON.stringify(lyricsMap.get(0).original)).toBe(JSON.stringify(['바쁘게', '살아온', '당신의', '젊음에', '의미를', '더해줄', '아이가', '생기고']));
    expect(JSON.stringify(lyricsMap.get(0).translated)).toBe(JSON.stringify(['In', 'your', 'busy', 'youth,', 'you', 'had', 'a', 'child', 'who', 'would', 'lend', 'purpose', 'to', 'your', 'life.']));
    expect(JSON.stringify(lyricsMap.get(7).original)).toBe(JSON.stringify(['당신의', '웃음', '꽃', '피우길', '피우길x3']));
    expect(JSON.stringify(lyricsMap.get(7).translated)).toBe(JSON.stringify(['Just', 'to', 'see', 'your', 'blooming', 'smile', 'again', 'x3']));
  });
});
