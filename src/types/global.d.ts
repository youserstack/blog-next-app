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

interface IComment {
  _id: Types.ObjectId;
  content: string;
  author: Types.ObjectId;
  post: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

interface ICategory {
  _id: Types.ObjectId;
  name: string;
  sub1Categories: {
    _id: Types.ObjectId;
    name: string;
    sub2Categories: {
      _id: Types.ObjectId;
      name: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}
