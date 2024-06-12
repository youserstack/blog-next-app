import { MouseEvent } from "react";

export default function PostArticleEditModeButton({ setIsEditMode, setIsClicked }: any) {
  const handleClickCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditMode(false);
    setIsClicked(false);
  };

  return (
    <div className="post-article-edit-mode-button">
      <button type="submit">save</button>
      <button onClick={handleClickCancelButton}>cancel</button>
    </div>
  );
}
