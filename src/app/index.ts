import express from 'express';
import { appErrorHandler } from './errorHandler';
import { appMiddleware } from './middleware';
import { appRouter } from './router';
import { appServer } from './server';

const app = express();

appMiddleware(app);
appRouter(app);
appErrorHandler(app);
appServer(app);
