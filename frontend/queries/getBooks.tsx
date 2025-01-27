import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
query GetBooks {
  getBooks {
    title
    id
    description
    published_date
    authors {
      name
    }
  }
}
`;