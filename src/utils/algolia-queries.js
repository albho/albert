const escapeStringRegexp = require('escape-string-regexp');

const pagePath = `blogs`;
const indexName = `blogs`;

const pageQuery = `{
  pages: allMdx(filter: { frontmatter: {slug: {regex: "/blogs/" }}}) {
    edges {
      node {
        id
        frontmatter {
          title
          description
        }
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...rest,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`description:20`] },
  },
];

module.exports = queries;
