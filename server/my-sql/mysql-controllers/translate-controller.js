const { translate } = require('../lang-translator/lang-translator');
const login = require('../../../some.json');

/**
 *
  Response object
  {
    "message": {
      "@type": "response",
      "@service": "naverservice.nmt.proxy",
      "@version": "1.0.0",
      "result": {
        "srcLangType": "ko",
        "tarLangType": "en",
        "translatedText": "my dear"
      }
    }
  }
 * @param {*} req
 * @param {*} res
 */
const naverTranslate = (req, res) => {
  const { text } = req.params;

  const client_id = login.naver.translation.clientId;
  const client_secret = login.naver.translation.clientSecret;
  const query = "번역할 문장을 입력하세요.";
  const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  const request = require('request');
  const options = {
    url: api_url,
    // form: { 'source': 'ko', 'target': 'en', 'text': query },
    form: { 'source': 'ko', 'target': 'en', 'text': text },
    headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
  };

  // const mockBody = {
  //   "message": {
  //     "@type": "response",
  //     "@service": "naverservice.nmt.proxy",
  //     "@version": "1.0.0",
  //     "result": {
  //       "srcLangType": "ko",
  //       "tarLangType": "en",
  //       "translatedText": "my dear"
  //     }
  //   }
  // }

  // const unified = unifyNaverResponse(mockBody);
	// console.log("​naverTranslate -> unified", unified)

  // res.send(unified)

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      const unified = unifyNaverResponse(body);
			console.log("​naverTranslate -> unified", unified)
      res.json(unified);
    } else {
      res.status(response.statusCode).end();
    }
  });
}

/**
 * @returns {translations: [{translation: '...'}]}
 */
const unifyNaverResponse = (naverResponse) => {
  const parsed = JSON.parse(naverResponse);
  return {
    translations: [
      { translation: parsed.message.result.translatedText }
    ]
  }
}

// naverTranslate()

/**
 * Response object
  {
    "translations": [
      {
        "translation": "Hola"
      }
    ],
    "word_count": 1,
    "character_count": 5
  }
 * @param {*} req
 * @param {*} res
 */
const watsonTranslate = (req, res) => {
  const { text } = req.params;
  const result = translate(text);
  return result.then(data => {
    res.json(data);
  })
}

exports.translateFactory = (engine) => {
  switch (engine) {
    case 'naver':
      return naverTranslate;
    case 'watson':
      return watsonTranslate;
    default:
      throw new Error('No such translation engine available. Currently we offer: naver, watson.')
  }
}
