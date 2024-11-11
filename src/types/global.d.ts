interface IPost {
  _id: Types.ObjectId;
  category: string;
  title: string;
  content: string;
  author: Types.ObjectId;
  tags?: string[];
  comments?: Types.ObjectId[];
  image?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface LatestPostsResponse {
  posts: IPost[];
}

interface IComment {
  _id: Types.ObjectId;
  content: string;
  author: Types.ObjectId; // User와 연결된 ObjectId
  post: Types.ObjectId; // Post와 연결된 ObjectId
  createdAt: string;
  updatedAt: string;
}

interface ICategory {
  _id: Types.ObjectId;
  name: string;
  sub1Categories: {
    name: string;
    sub2Categories: {
      name: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}
