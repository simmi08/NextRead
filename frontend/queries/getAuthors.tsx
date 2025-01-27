import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GetAuthors {
    getAuthors {
      name
      id
      born_date
      biography
      books {
        title
      }
    }
  }
`;
