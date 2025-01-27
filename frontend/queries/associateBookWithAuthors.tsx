import { gql } from '@apollo/client';

export const ASSOCIATE_BOOK_WITH_AUTHORS = gql`
mutation AssociateBookWithAuthors($bookId: ID!, $authorIds: [ID!]!) {
  associateBookWithAuthors(bookId: $bookId, authorIds: $authorIds) {
    id
  }
}
`;
