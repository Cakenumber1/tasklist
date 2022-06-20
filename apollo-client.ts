import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'api/server',
  cache: new InMemoryCache(),
});

export default client;
