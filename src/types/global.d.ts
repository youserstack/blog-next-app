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
  createdAt: Date;
  updatedAt: Date;
}

interface LatestPostsResponse {
  posts: IPost[];
}
