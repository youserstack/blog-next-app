"use client";

import { MouseEvent, useContext, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import "../../styles/CategoryOptionButton.scss";

export default function CategoryOptionButton() {
  const [isClicked, setIsClicked] = useState(false);
  const { setCurrentModal }: any = useContext(Context);

  const handleClickOptionButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  const handleClickDeleteButton = () => {
    setCurrentModal("category-delete-modal");
  };

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="category-option-button" onClick={handleClickOptionButton}>
      <IoIosMore />
      {isClicked && (
        <div className="option-layer" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <button onClick={handleClickDeleteButton}>delete this category</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
