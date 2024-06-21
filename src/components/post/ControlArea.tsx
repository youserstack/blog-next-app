import CategoryOptionButton from "@/components/category/CategoryOptionButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import "./ControlArea.scss";

export default function ControlArea({ categorySegments }: { categorySegments: string[] }) {
  return (
    <div className="control-area">
      <PostCreateButton />
      <CategoryOptionButton categorySegments={categorySegments} />
    </div>
  );
}
