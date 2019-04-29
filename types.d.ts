declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    APP_NAME: string;
    APP_HOST: string;
    APP_PORT: number;
    APP_CORS_ORIGIN: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    SENDGRID_API_KEY: string;
    JWT_SECRET_KEY: string;
    GOOGLE_CLIENT_ID: string;
  }
}

declare namespace Express {
  interface Request {
    user?: any;
    token?: string;
  }
}
