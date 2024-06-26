import PostCreateButton from "@/components/buttons/PostCreateButton";
import CategoryOptionButton from "@/components/buttons/CategoryOptionButton";
import "./ControlArea.scss";

export default function ControlArea({ categorySegments }: { categorySegments: string[] }) {
  return (
    <div className="control-area">
      <PostCreateButton />
      <CategoryOptionButton categorySegments={categorySegments} />
    </div>
  );
}
