import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $description: String, $publishedDate: String) {
    createBook(title: $title, description: $description, published_date: $publishedDate) {
      id
    }
  }
`;
