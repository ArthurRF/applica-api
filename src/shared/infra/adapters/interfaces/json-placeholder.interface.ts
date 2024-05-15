export interface IListPostsProps {
  start: number;
  size: number;
}

export interface IListPostsCommentsProps {
  slicedPostsIds: number[];
}

export interface IPostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IPostsReturn {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IUserGeo {
  lat: string;
  lng: string;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IUserGeo;
}

export interface IUserResult {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IMergedPost extends IPostsReturn {
  user: IUserResult;
}
