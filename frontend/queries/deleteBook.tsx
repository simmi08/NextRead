import { gql } from '@apollo/client';

export const DELETE_BOOK = gql`
  mutation DeleteBook($deleteBookId: ID!) {
    deleteBook(id: $deleteBookId)
  }
`;
