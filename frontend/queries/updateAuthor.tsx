import { gql } from '@apollo/client';

export const UPDATE_AUTHOR = gql`
mutation UpdateAuthor($updateAuthorId: ID!, $biography: String, $bornDate: String) {
  updateAuthor(id: $updateAuthorId, biography: $biography, born_date: $bornDate) {
    id
  }
}
`;
