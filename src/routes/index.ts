import { Router } from 'express';
import AuthController from '~/routes/controllers/Auth';
import { AuthGuard } from '~/routes/middlewares/AuthGuard';

export const routes = (router: Router) => {
  router.get('/auth/current', AuthGuard, AuthController.CurrentAuth);
  router.post('/auth/local/signup', AuthController.SignUpWithEmail);
  router.post('/auth/local/login', AuthController.SignInWithEmail);
  router.post('/auth/local/forgot-password', AuthController.ForgotPassword);
  router.post(
    '/auth/local/check-password-token',
    AuthController.CheckPasswordToken,
  );
  router.post('/auth/local/reset-password', AuthController.ResetPassword);
  router.post('/auth/google', AuthController.SignInOrSignUpWithGoogle);

  return router;
};
