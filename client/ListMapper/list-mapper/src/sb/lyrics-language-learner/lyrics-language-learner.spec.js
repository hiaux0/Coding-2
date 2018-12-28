import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { PLATFORM } from 'aurelia-pal';

const testLyrics = `바쁘게 살아온 당신의 젊음에 의미를 더해줄 아이가 생기고
In your busy youth, you had a child who would lend purpose to your life.`

describe('LYRICS-LANGUAGE-LEARNER', () => {
  let component;
  let bindData = {
    lyrics: testLyrics
  }

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('sb/lyrics-language-learner/lyrics-language-learner'))
      .inView(`
        <lyrics-language-learner
          lyrics.bind="lyrics"
        >
        </lyrics-language-learner>
      `)
      .boundTo(bindData);
  });

  afterEach(() => {
    component.dispose();
  })

  it('Should load component', done => {
    component.create(bootstrap).then(() => {
      done();
    })
  });

  it('Should display correct words for original lyrics', done => {
    component.create(bootstrap).then(() => {
      const element = component.element;
      let originalLyrics = element.querySelector('.lyrics-original');

      expect(originalLyrics.children.length).toBe(8);
      expect(originalLyrics.innerText).toBe('바쁘게 살아온 당신의 젊음에 의미를 더해줄 아이가 생기고');
      done();
    });
  });

  it('Should display correct words for translation lyrics', done => {
    component.create(bootstrap).then(() => {
      const element = component.element;
      let translatedLyrics = element.querySelector('.lyrics-translation');

      expect(translatedLyrics.children.length).toBe(15);
      expect(translatedLyrics.innerText).toBe('In your busy youth, you had a child who would lend purpose to your life.');
      done();
    });
  });

  it('Should show correct number of split words', done => {
    component.create(bootstrap).then(() => {
      const element = component.element;
      const originalLyrics = element.querySelector('.lyrics-original');
      const lyricsWord = originalLyrics.querySelector('.lyrics-word');

      expect(originalLyrics.children.length).toBe(8);
      expect(lyricsWord.innerText).toBe('바쁘게 ')
      done();
    });
  });

  it('Should show correct number of line numbers', done => {
    component.create(bootstrap).then(() => {
      const element = component.element;
      const lineNumbers = element.querySelectorAll('.lyrics-line-number');

      expect(lineNumbers.length).toBe(1);
      done();
    });
  });

  it('Should show correct line number', done => {
    component.create(bootstrap).then(() => {
      const element = component.element;
      const lineNumbers = element.querySelector('.lyrics-line-number');

      expect(lineNumbers.innerText).toBe('0');
      done();
    });
  });
});
