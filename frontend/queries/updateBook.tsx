import { gql } from '@apollo/client';

export const UPDATE_BOOK = gql`
mutation UpdateBook($updateBookId: ID!, $description: String, $publishedDate: String) {
  updateBook(id: $updateBookId, description: $description, published_date: $publishedDate) {
    id
  }
}
`;
