import { gql } from '@apollo/client';

export const CREATE_AUTHOR = gql`
mutation CreateAuthor($name: String!, $biography: String, $bornDate: String) {
  createAuthor(name: $name, biography: $biography, born_date: $bornDate) {
    id
  }
}
`;
