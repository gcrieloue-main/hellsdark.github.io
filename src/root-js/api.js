import * as showdown from 'showdown'
import * as contentful from 'contentful'

const client = contentful.createClient({
  space: 'oamir411dfuu',
  accessToken:
    'fe844e41216f12522cc40b8a179e7c81c8a0f17b797503155ba949afbb6aca96',
})

const converter = new showdown.Converter({
  headerLevelStart: 4,
  simpleLineBreaks: true,
  tables: true,
})

export function getArticles(page, nbArticles) {
  page = page || 1
  return client
    .getEntries({
      content_type: 'article',
      order: '-fields.date',
      skip: (page - 1) * nbArticles,
      limit: nbArticles,
    })
    .then(({items}) => items.map(processArticle))
    .catch((error) => {
      console.error(error)
    })
}

export function getArticle(slug) {
  let entry = client
    .getEntries({
      content_type: 'article',
      'fields.slug': slug,
    })
    .then((entries) => {
      if (entries.total === 0) {
        return Promise.reject('no article found with slug ' + slug)
      }
      return entries.items[0]
    })
  return (
    entry
      // si la recherche par slug ne fonctionne pas, on recherche par slug
      .catch(() => {
        return client.getEntry(slug)
      })
      .then(processArticle)
      .catch((error) => {
        console.error(error)
        throw error
      })
  )
}

export function searchArticles(text) {
  const nbArticles = 10
  return client
    .getEntries({
      content_type: 'article',
      order: '-fields.date',
      limit: nbArticles,
      'fields.content[match]': text,
    })
    .then(({items}) => items.map(processArticle))
    .catch((error) => {
      console.error(error)
    })
}

function processArticle(element) {
  element.fields.title = replaceSmileys(element.fields.title)
  element.fields.content = converter.makeHtml(
    replaceSmileys(element.fields.content)
  )
  if (element.fields.date !== undefined) {
    const date = new Date(element.fields.date)
    const formatedMonth = ('0' + (date.getMonth() + 1)).slice(-2)
    const formatedDay = ('0' + date.getDate()).slice(-2)
    element.fields.date = formatedDay + '/' + formatedMonth
  }
  return element
}

/**
 * Replace ascii smileys with utf-8 smileys
 */
function replaceSmileys(text) {
  return text
    .replace(/:\)/g, '😃')
    .replace(/;\)/g, '😉')
    .replace(/:\(/g, '😩')
    .replace(/:D/g, '😄')
}

const formatDate = (date) =>
  ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()

export function getWorkExperiences() {
  return client
    .getEntries({
      content_type: 'workExperience',
      order: '-fields.periodBegin',
    })
    .then(({items}) =>
      items.map(function (element) {
        const begin = new Date(element.fields.periodBegin)
        const end = new Date(element.fields.periodEnd)
        const beginDate = formatDate(begin)
        let endDate = end >= new Date() ? "Aujourd'hui" : formatDate(end)
        element.fields.begin = beginDate
        element.fields.end = endDate
        element.fields.description = converter.makeHtml(
          element.fields.description
        )
        return element
      })
    )
    .catch((error) => {
      console.error(error)
    })
}

export function getCvParagraphs() {
  return client
    .getEntries({
      content_type: 'paragraph',
      order: 'sys.createdAt',
    })
    .then(({items}) =>
      items.map((element) => {
        element.fields.text = converter.makeHtml(element.fields.text)
        return element
      })
    )
    .catch((error) => {
      console.error(error)
    })
}
