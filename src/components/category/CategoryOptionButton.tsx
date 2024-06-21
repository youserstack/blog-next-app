"use client";

import { MouseEvent, useContext, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import PostCreateButton from "@/components/post/PostCreateButton";
import "../../styles/CategoryOptionButton.scss";

export default function CategoryOptionButton({
  categorySegments,
}: {
  categorySegments: string[] | null;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const { user, setCurrentModal }: any = useContext(Context);

  const handleClickOptionButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  const handleClickDeleteButton = () => setCurrentModal("category-delete-modal");

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
              <button>menu 1</button>
            </li>
            <li>
              <button>menu 1</button>
            </li>
            <li>
              <button className="category-delete-button" onClick={handleClickDeleteButton}>
                delete this category
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
