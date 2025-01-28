import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://nextread-production.up.railway.app/', 
  cache: new InMemoryCache(),
});

export default client;
