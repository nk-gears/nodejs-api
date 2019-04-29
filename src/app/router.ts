import { Express, Router } from 'express';
import AuthController from '~/controllers/Auth';

const routes = (router: Router): Router => {
  // router.get('/auth/current', AuthGuard, AuthController.CurrentAuth);
  router.post('/auth/local/signup', AuthController.SignUpWithEmail);
  router.post('/auth/local/signin', AuthController.SignInWithEmail);
  // router.post('/auth/local/forgot-password', AuthController.ForgotPassword);
  // router.post(
  //   '/auth/local/check-password-token',
  //   AuthController.CheckPasswordToken,
  // );
  // router.post('/auth/local/reset-password', AuthController.ResetPassword);
  // router.post('/auth/google', AuthController.SignInOrSignUpWithGoogle);

  return router;
};

export const appRouter = (app: Express): void => {
  const router = Router();
  app.use(routes(router));
};
