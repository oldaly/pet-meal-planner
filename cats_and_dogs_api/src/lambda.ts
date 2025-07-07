import serverlessExpress from '@vendia/serverless-express';
import app from './app';  // This must resolve properly

export const handler = serverlessExpress({ app });
