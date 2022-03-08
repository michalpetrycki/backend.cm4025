import dotenv from 'dotenv';
import 'module-alias/register';
import App from './app';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources//user/user.controller';
import HealthCheckController from '@/resources/health-check/health-check.controller';

// validateEnv();

dotenv.config();

const app = new App([new PostController(), new UserController(), new HealthCheckController()], Number(process.env.PORT));

app.listen();
