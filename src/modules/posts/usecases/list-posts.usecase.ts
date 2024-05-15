import {
  IMergedPost,
  IPostComment,
  IPostsReturn,
  IUserResult,
} from '@shared/infra/adapters/interfaces/json-placeholder.interface';
import { JsonPlaceholderApi } from '@shared/infra/adapters/json-placeholder.adapter';

import Container, { Service } from 'typedi';

interface IProps {
  start: number;
  size: number;
}

@Service()
export class ListPostsUsecase {
  constructor(private jsonPlaceholderApi = Container.get(JsonPlaceholderApi)) {}

  async execute({ start, size }: IProps): Promise<any> {
    const slicedPosts = await this.jsonPlaceholderApi.listPosts({
      start,
      size,
    });

    const result = await this.populatePosts(slicedPosts);

    return result;
  }

  async populatePosts(slicedPosts: IPostsReturn[]): Promise<IMergedPost[]> {
    const slicedPostsIds = slicedPosts.map(post => post.id);

    const users = await this.jsonPlaceholderApi.listUsers();

    const postsComments = await this.jsonPlaceholderApi.listComments({
      slicedPostsIds,
    });

    const result = slicedPosts.map(post => {
      const user = users.find(user => user.id === post.userId) as IUserResult;

      let comments: IPostComment[] = [];
      postsComments.forEach(comment => {
        if (comment.postId === post.id) {
          comments = comment.data;
        }
      });
      // const comments = postsComments.filter(
      //   comment => comment.postId === post.id
      // );

      return {
        ...post,
        user: {
          ...user,
        },
        comments,
      };
    });

    return result;
  }
}
