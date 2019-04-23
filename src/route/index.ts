import { Router } from 'express';
import AuthController from '~/route/controllers/Auth';
import { AuthGuard } from '~/route/middleware/AuthGuard';

export const routes = (router: Router) => {
  router.get('/auth/current', AuthGuard, AuthController.CurrentAuth);
  router.post('/auth/local/signup', AuthController.SignUpWithEmail);
  router.post('/auth/local/signin', AuthController.SignInWithEmail);
  router.post('/auth/local/forgot-password', AuthController.ForgotPassword);
  router.post(
    '/auth/local/check-password-token',
    AuthController.CheckPasswordToken,
  );
  router.post('/auth/local/reset-password', AuthController.ResetPassword);
  router.post('/auth/google', AuthController.SignInOrSignUpWithGoogle);

  return router;
};
