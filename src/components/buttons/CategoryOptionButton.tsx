"use client";

import { MouseEvent, useContext, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import PostCreateButton from "@/components/buttons/PostCreateButton";
import CategoryDeleteButton from "@/components/buttons/CategoryDeleteButton";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import "./CategoryOptionButton.scss";

export default function CategoryOptionButton({
  categorySegments,
}: {
  categorySegments: string[] | null;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const { user }: any = useContext(Context);

  const handleClickOptionButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (!user) return null;

  return (
    <div className="category-option-button" onClick={handleClickOptionButton}>
      <IoIosMore className="more" />
      {isClicked && (
        <div className="option-layer" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <CategoryCreateButton
                parentCategories={categorySegments}
                label="create a new category"
              />
            </li>
            <li>
              <PostCreateButton />
            </li>
            <li>
              <CategoryDeleteButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
