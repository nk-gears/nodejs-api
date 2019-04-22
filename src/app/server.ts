import { Express } from 'express';

export const appServer = (app: Express): void => {
  app.listen(process.env.APP_PORT, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Server is running on http://${process.env.APP_HOST}:${
          process.env.APP_PORT
        }`,
      );
    }
  });
};
