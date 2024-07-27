import mongoose from "mongoose";
import { UserDocument } from "./User";

export interface CommentDocument extends mongoose.Document {
  content: string;
  author: UserDocument["_id"];
  post: mongoose.Schema.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<CommentDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User 스키마와 연결
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Post 스키마와 연결
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
