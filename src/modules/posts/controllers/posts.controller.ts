import { Request, Response } from 'express';
import Container, { Service } from 'typedi';
import { ListPostsUsecase } from '../usecases/list-posts.usecase';

@Service()
export class PostsController {
  async process(req: Request, res: Response): Promise<Response> {
    const listPosts = Container.get(ListPostsUsecase);

    const queryParams = req.query;
    let start = 0;
    let size = 10;

    if (queryParams.start) {
      start = Number(queryParams.start);
    }

    if (queryParams.size) {
      size = Number(queryParams.size);
    }

    const returnData = await listPosts.execute({
      start,
      size,
    });

    if (returnData.length === 0) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(returnData);
  }
}
