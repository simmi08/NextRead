const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String
    authors: [Author!]!
  }

  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    books: [Book!]!
  }

  type Query {
    getAuthors: [Author!]!
    getBooks: [Book!]!
  }

  type Mutation {
    createBook(title: String!, description: String, published_date: String): Book!
    updateBook(id: ID!, title: String, description: String, published_date: String): Book!
    deleteBook(id: ID!): String!

    createAuthor(name: String!, biography: String, born_date: String): Author!
    updateAuthor(id: ID!, name: String, biography: String, born_date: String): Author!
    deleteAuthor(id: ID!): String!


    associateBookWithAuthors(bookId: ID!, authorIds: [ID!]!): Book!
  }
`;

module.exports = typeDefs;
