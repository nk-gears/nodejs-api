import express from 'express';
import 'reflect-metadata';
import { appDatabase } from './database';
import { appErrorHandler } from './errorHandler';
import { appMiddleware } from './middleware';
import { appRouter } from './router';
import { appServer } from './server';

const app = express();

(async () => {
  try {
    await appDatabase();
    appMiddleware(app);
    appRouter(app);
    appErrorHandler(app);
    appServer(app);
  } catch (error) {
    console.log(error);
  }
})();
