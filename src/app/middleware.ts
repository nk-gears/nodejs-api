import compression from 'compression';
import cors from 'cors';
import { Express, json, urlencoded } from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';

export const appMiddleware = (app: Express): void => {
  app.use(json());
  app.use(urlencoded({ extended: false }));

  if (process.env.NODE_ENV === 'development') {
    // app middleware for development environment
  }

  if (process.env.NODE_ENV === 'production') {
    // app middleware for production environment
    app.use(compression());
  }

  app.use(
    cors({
      origin: [process.env.APP_CORS_ORIGIN],
    }),
  );
  app.use(helmet());
  app.use(
    new RateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 100,
    }),
  );
};
