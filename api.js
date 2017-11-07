import * as showdown from "./showdown.min.js";
import * as contentful from "contentful";

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "oamir411dfuu",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken:
    "fe844e41216f12522cc40b8a179e7c81c8a0f17b797503155ba949afbb6aca96"
});

var converter = new showdown.Converter({
  headerLevelStart: 4,
  simpleLineBreaks: true
});

export function getArticles(page) {
  page = page || 1;
  var nbArticles = 10;
  return client
    .getEntries({
      content_type: "article",
      order: "-fields.date",
      skip: (page - 1) * nbArticles,
      limit: nbArticles
    })
    .then(response =>
      response.items.map(function(element) {
        element.fields.title = replaceSmileys(element.fields.title);
        element.fields.content = converter.makeHtml(
          replaceSmileys(element.fields.content)
        );
        if (element.fields.date != undefined) {
          var date = new Date(element.fields.date);
          var formatedMonth = ("0" + (date.getMonth() + 1)).slice(-2);
          var formatedDay = ("0" + date.getDate()).slice(-2);
          element.fields.date = formatedDay + "/" + formatedMonth;
        }
        return element;
      })
    )
    .catch(error => {
      console.error(error);
    });
}

/**
 * Replace ascii smileys with utf-8 smileys
 */
function replaceSmileys(text) {
  return text
    .replace(/:\)/g, "😃")
    .replace(/;\)/g, "😉")
    .replace(/:\(/g, "😩")
    .replace(/:D/g, "😄");
}

export function getWorkExperiences() {
  return client
    .getEntries({
      content_type: "workExperience",
      order: "-fields.periodBegin"
    })
    .then(response =>
      response.items.map(function(element) {
        var begin = new Date(element.fields.periodBegin);
        var end = new Date(element.fields.periodEnd);
        var beginDate =
          ("0" + (begin.getMonth() + 1)).slice(-2) + "/" + begin.getFullYear();
        var endDate = "Aujourd'hui";
        if (end < new Date()) {
          endDate =
            ("0" + (end.getMonth() + 1)).slice(-2) + "/" + end.getFullYear();
        }
        element.fields.begin = beginDate;
        element.fields.end = endDate;
        element.fields.description = converter.makeHtml(
          element.fields.description
        );
        return element;
      })
    )
    .catch(error => {
      console.error(error);
    });
}

export function getCvParagraphs() {
  return client
    .getEntries({
      content_type: "paragraph",
      order: "sys.createdAt"
    })
    .then(response =>
      response.items.map(function(element) {
        element.fields.text = converter.makeHtml(element.fields.text);
        return element;
      })
    )
    .catch(error => {
      console.error(error);
    });
}
