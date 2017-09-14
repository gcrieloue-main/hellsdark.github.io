'use strict'

const SPACE_ID = 'oamir411dfuu'
const ACCESS_TOKEN = 'fe844e41216f12522cc40b8a179e7c81c8a0f17b797503155ba949afbb6aca96'

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})

console.log('This is a simplified example to demonstrate the usage of the Contentful CDA\n')

// Entry point of the boilerplate, called at the end.
function runBoilerplate () {
  displayContentTypes()
  .then(displayEntries)
  .then(() => {
    console.log('Want to go further? Feel free to check out this guide:')
  })
  .catch((error) => {
    if (error.stack) {
      console.error(error.stack)
      return
    }
    console.error(error)
  })
}

function displayContentTypes () {

  return fetchContentTypes()
  .then((contentTypes) => {
    // Display a table with Content Type information
    const table = new Table({
      head: ['Id', 'Title', 'Fields']
    })
    contentTypes.forEach((contentType) => {
      const fieldNames = contentType.fields
        .map((field) => field.name)
        .sort()
      table.push([contentType.sys.id, contentType.name, fieldNames.join(', ')])
    })
    console.log(table.toString())

    return contentTypes
  })
}

function displayEntries (contentTypes) {

  return Promise.all(contentTypes.map((contentType) => {
    return fetchEntriesForContentType(contentType)
    .then((entries) => {
      console.log(`\These are the first 100 Entries for Content Type ${chalk.cyan(contentType.name)}:\n`)

      // Display a table with Entry information
      const table = new Table({
        head: ['Id', 'Title']
      })
      entries.forEach((entry) => {
        table.push([entry.sys.id, entry.fields[contentType.displayField] || '[empty]'])
      })
      console.log(table.toString())
    })
  }))
}

// Load all Content Types in your space from Contentful
function fetchContentTypes () {
  return client.getContentTypes()
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
}

// Load all entries for a given Content Type from Contentful
function fetchEntriesForContentType (contentType) {
  return client.getEntries({
      content_type: contentType.sys.id
    })
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
}

// Start the boilerplate code
runBoilerplate()
