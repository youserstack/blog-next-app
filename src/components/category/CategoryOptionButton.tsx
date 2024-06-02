"use client";

import { MouseEvent, useContext, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import "../../styles/CategoryOptionButton.scss";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";

export default function CategoryOptionButton({
  categorySegments,
}: {
  categorySegments: string[] | null;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const { setCurrentModal }: any = useContext(Context);

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
              <button>menu 1</button>
            </li>
            <li>
              <button>menu 1</button>
            </li>
            <li>
              <button>menu 1</button>
            </li>
            <li>
              <button className="delete-button" onClick={handleClickDeleteButton}>
                delete this category
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
