const test = require('tape')
const addStoriesToStoriesPage = require('../../../lib/build/add-story-pages-to-stories-page')

test('add story pages to the stories page', assert => {
  const e = {}

  e.pages = [
    {
      'title': 'Stories list',
      'route': '/stories/'
    },
    {
      'title': 'Awesome tale',
      'route': '/stories/awesome-tale/'
    }
  ]

  addStoriesToStoriesPage(e)

  assert.same(
    [
      {
        'title': 'Stories list',
        'route': '/stories/',
        'stories': [
          {
            'title': 'Awesome tale',
            'route': '/stories/awesome-tale/'
          }
        ]
      },
      {
        'title': 'Awesome tale',
        'route': '/stories/awesome-tale/'
      }
    ],
    e.pages,
    'Story pages has been added to stories page'
  )

  assert.end()
})

test('when no stories page we will skip', assert => {
  const e = {}

  e.pages = [
    {
      'title': 'Stories list',
      'route': '/no-stories-page/'
    },
    {
      'title': 'Awesome tale',
      'route': '/stories/awesome-tale/'
    }
  ]

  addStoriesToStoriesPage(e)

  assert.same(
    [
      {
        'title': 'Stories list',
        'route': '/no-stories-page/'
      },
      {
        'title': 'Awesome tale',
        'route': '/stories/awesome-tale/'
      }
    ],
    e.pages
  )

  assert.end()
})
