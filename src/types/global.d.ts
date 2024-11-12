interface IUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}

interface IPost {
  _id: string;
  category: string;
  title: string;
  content: string;
  author: IUser;
  tags?: string[];
  comments?: IComment[];
  image?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface IComment {
  _id: string;
  content: string;
  author: IUser;
  post: IPost;
  createdAt: string;
  updatedAt: string;
}

interface ICategory {
  _id: string;
  name: string;
  sub1Categories: {
    _id: string;
    name: string;
    sub2Categories: {
      _id: string;
      name: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}
