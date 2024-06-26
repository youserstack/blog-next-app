import { MouseEvent } from "react";
import "./ArticleEditButtons.scss";

export default function ArticleEditButtons({ setIsEditMode }: any) {
  const handleClickCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  return (
    <div className="article-edit-buttons">
      <button type="submit">save</button>
      <button onClick={handleClickCancelButton}>cancel</button>
    </div>
  );
}
