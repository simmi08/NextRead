import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://93a8-106-219-174-199.ngrok-free.app', 
  cache: new InMemoryCache(),
});

export default client;
