import { gql } from '@apollo/client';

export const DELETE_AUTHOR = gql`
mutation DeleteAuthor($deleteAuthorId: ID!) {
  deleteAuthor(id: $deleteAuthorId)
}
`;
