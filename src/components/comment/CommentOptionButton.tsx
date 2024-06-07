import { MouseEvent, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import "../../styles/CommentOptionButton.scss";

export default function CommentOptionButton({ comment }: any) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickOptionButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  const handleClick = () => {
    console.log({ comment });
  };

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="comment-option-button" onClick={handleClickOptionButton}>
      <IoIosMore className="more" />
      {isClicked && (
        <div className="option-layer" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <button onClick={handleClick}>menu</button>
            </li>
            <li>
              <button>menu</button>
            </li>
            <li>
              <button>menu</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
