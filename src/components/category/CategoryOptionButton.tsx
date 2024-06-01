"use client";

import { useContext, useState } from "react";
import { IoIosMore } from "react-icons/io";
import "../../styles/CategoryOptionButton.scss";
import { Context } from "@/components/context/Provider";

export default function CategoryOptionButton() {
  const [isClicked, setIsClicked] = useState(false);
  const { setCurrentModal }: any = useContext(Context);

  const handleClickDeleteButton = () => {
    setCurrentModal("category-delete-modal");
  };

  return (
    <div className="category-option-button" onClick={() => setIsClicked(!isClicked)}>
      <IoIosMore />
      {isClicked && (
        <div className="option-layer" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>sdfsdf</li>
            <li>sdfsdf</li>
            <li>sdfsdf</li>
            <hr />
            <li>
              <button onClick={handleClickDeleteButton}>delete this category</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
