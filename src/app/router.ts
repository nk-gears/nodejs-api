import { Express, Router } from 'express';
import { routes } from '~/routes';

const router = Router();

export const appRouter = (app: Express) => {
  app.use(routes(router));
};
