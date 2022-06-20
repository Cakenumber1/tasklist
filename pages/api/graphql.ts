import { ApolloServer } from 'apollo-server-micro';
// @ts-ignore
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';

import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const server = new ApolloServer({ resolvers, typeDefs });

const startServer = server.start();

export default cors(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
});
