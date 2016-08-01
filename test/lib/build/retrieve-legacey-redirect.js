let test = require('tape'),
  legacyRedirects = require('../../../lib/build/retrieve-legacy-redirects');

test('retrieve legacy redirects as pages', assert => {

  const obj = {
    config : {
      sitePath : __dirname,
      baseUrl : 'http://example.com'
    },
    pages : {
      existing: {},
    }
  };

  const result = legacyRedirects(obj);

  assert.same(obj.config, result.config, 'Config should not be altered');

  assert.equal('http://example.com/new-page', result.pages['/some-legacy-page-1/'].redirect, 'First page redirect should be set');
  assert.equal('redirect', result.pages['/some-legacy-page-1/'].template, 'First page template should be set as redirect');

  assert.equal('http://example.com/new-page', result.pages['/some-legacy-page-2/'].redirect, 'Second page redirect should be set');
  assert.equal('redirect', result.pages['/some-legacy-page-2/'].template, 'Second page template should be set as redirect');

  assert.equal(true, obj.pages.hasOwnProperty('existing'), 'Other pages still exist');

  assert.end();
});
