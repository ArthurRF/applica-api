import axios from 'axios';
import { Service } from 'typedi';
import {
  IListPostsCommentsProps,
  IListPostsProps,
  IPostComment,
  IPostsReturn,
  IUserResult,
} from './interfaces/json-placeholder.interface';

@Service()
export class JsonPlaceholderApi {
  public async listPosts({
    size,
    start,
  }: IListPostsProps): Promise<IPostsReturn[]> {
    try {
      const url = `${process.env.JSON_PLACEHOLDER_API_URL}/posts`;

      const result = await axios.get(url);

      const slicedResult = [];

      if (result.data) {
        slicedResult.push(...result.data.slice(start, start + size));
      }

      return slicedResult;
    } catch (error) {
      return [];
    }
  }

  public async listUsers(): Promise<IUserResult[]> {
    try {
      const url = `${process.env.JSON_PLACEHOLDER_API_URL}/users`;

      const result = await axios.get(url);

      return result.data;
    } catch (error) {
      return [];
    }
  }

  public async listComments({
    slicedPostsIds,
  }: IListPostsCommentsProps): Promise<
    {
      postId: number;
      data: IPostComment[];
    }[]
  > {
    try {
      const result = await Promise.all(
        slicedPostsIds.map(postId => {
          const url = `${process.env.JSON_PLACEHOLDER_API_URL}/posts/${postId}/comments`;

          const result = axios.get(url);

          return result;
        })
      );

      return result.map(({ data }) => ({ postId: data[0].postId, data }));
    } catch (error) {
      return [];
    }
  }
}
