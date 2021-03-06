const test = require('tape')
const pageMultiValuedFieldsToArray = require('../../../lib/build/page-multi-valued-fields-to-array')

test('Map multi valued fields to arrays in page properties', assert => {
  let e = {
    pages: []
  }

  e.pages.push({
    'Key1': 'some val',
    'Key2': 'some other val',
    'someKey': 'Some val'
  })

  pageMultiValuedFieldsToArray(e)

  assert.same(
    e,
    {
      pages: [
        {
          'Key1': 'some val',
          'Key2': 'some other val',
          'someKey': 'Some val',
          'Key': [
            'some val',
            'some other val'
          ]
        }
      ]
    }
  )

  assert.end()
})
