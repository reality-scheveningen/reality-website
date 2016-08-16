let test = require('tape')
let transformer = require('../../lib/contentful-locale-transformer')

test('transform contentful locale properties to parent scalar values', assert => {
  const example = {
    string: {
      'nl-NL': 'Some example string'
    }
  }

  const expected = {
    string: 'Some example string'
  }

  assert.same(transformer(example, 'nl-NL'), expected)
  assert.end()
})

test('transform contentful locale properties to parent object values', assert => {
  const example = {
    object: {
      'nl-NL': {
        string: 'Some example string',
        int: 10
      }
    }
  }

  const expected = {
    object: {
      string: 'Some example string',
      int: 10
    }
  }

  assert.same(transformer(example, 'nl-NL'), expected)
  assert.end()
})

test('transform contentful locale properties recursive (deep) and removes fields property', assert => {
  const example = {
    'title': {
      'nl-NL': 'Test title'
    },
    'multi-deep': {
      'nl-NL': [
        {
          'fields': {
            'title': {
              'nl-NL': 'Multi title 1'
            },
            'deep': {
              'nl-NL': {
                'fields': {
                  'title': {
                    'nl-NL': 'Inner title 1'
                  },
                  'deeper': {
                    'nl-NL': {
                      'title': 'inner inner title 1'
                    }
                  }
                }
              }
            }
          }
        },
        {
          'fields': {
            'title': {
              'nl-NL': 'Multi title 2'
            },
            'deep': {
              'nl-NL': {
                'fields': {
                  'title': {
                    'nl-NL': 'Inner title 2'
                  },
                  'deeper': {
                    'nl-NL': {
                      'title': 'inner inner title 2'
                    }
                  }
                }
              }
            }
          }
        }
      ]
    },
    'meta': {
      'nl-NL': 'Some meta'
    }
  }

  const expected = {
    'title': 'Test title',
    'multi-deep': [
      {
        'title': 'Multi title 1',
        'deep': {

          'title': 'Inner title 1',
          'deeper': {
            'title': 'inner inner title 1'
          }
        }
      },
      {
        'title': 'Multi title 2',
        'deep': {
          'title': 'Inner title 2',
          'deeper': {
            'title': 'inner inner title 2'
          }
        }
      }
    ],
    'meta': 'Some meta'
  }

  const result = transformer(example, 'nl-NL')

  assert.same(result, expected)
  assert.end()
})

test('when no contentful locale properties, it should keep object the same', assert => {
  const example = {
    object: {
      string: 'Some example string',
      int: 10
    }
  }

  const expected = {
    object: {
      string: 'Some example string',
      int: 10
    }
  }

  assert.same(transformer(example, 'nl-NL'), expected)
  assert.end()
})
