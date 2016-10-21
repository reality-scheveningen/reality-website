const test = require('tape')
const addStoriesToStoriesPage = require('../../../lib/build/add-story-pages-to-stories-page')

test('add story pages to the stories page', assert => {
  const e = {}

  e.pages = {
    '/stories/': {
      'title': 'Stories list'
    },
    '/stories/awesome-tale/': {
      'title': 'Awesome tale'
    }
  }

  addStoriesToStoriesPage(e)

  assert.same(
    {
      '/stories/': {
        'title': 'Stories list',
        'stories': {
          '/stories/awesome-tale/': {
            'title': 'Awesome tale'
          }
        }
      },
      '/stories/awesome-tale/': {
        'title': 'Awesome tale'
      }
    },
    e.pages,
    'Story pages has been added to stories page'
  )

  assert.end()
})

test('when no stories page we will skip', assert => {
  const e = {}

  e.pages = {
    '/no-stories-page/': {
      'title': 'Stories list'
    },
    '/stories/awesome-tale/': {
      'title': 'Awesome tale'
    }
  }

  addStoriesToStoriesPage(e)

  assert.same(
    {
      '/no-stories-page/': {
        'title': 'Stories list'
      },
      '/stories/awesome-tale/': {
        'title': 'Awesome tale'
      }
    },
    e.pages
  )

  assert.end()
})
