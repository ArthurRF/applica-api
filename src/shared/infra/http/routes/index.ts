import { PostsController } from '@modules/posts/controllers/posts.controller';
import { Router } from 'express';
import Container from 'typedi';

const routes = Router();

const postsController = Container.get(PostsController);

routes.get('/posts', postsController.process);

export default routes;
