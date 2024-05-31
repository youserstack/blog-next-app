"use client";

import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import "../../styles/CategoryOptionButton.scss";

export default function CategoryOptionButton() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <button className="category-option-button" onClick={() => setIsClicked(!isClicked)}>
      <IoIosMore />
      {isClicked && (
        <div className="option-layer" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>sdfsdf</li>
            <li>sdfsdf</li>
            <li>sdfsdf</li>
            <hr />
            <li>
              <button>delete this category</button>
            </li>
          </ul>
        </div>
      )}
    </button>
  );
}
