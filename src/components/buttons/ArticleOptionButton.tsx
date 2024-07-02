"use client";

import { useContext, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import Link from "next/link";
import "./ArticleOptionButton.scss";

export default function ArticleOptionButton({ post }: any) {
  const { user }: any = useContext(Context);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleClickMoreIcon = (e: any) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  if (!user) return null;

  return (
    <div className="article-option-button">
      <IoIosMore className="more-button" onClick={handleClickMoreIcon} />
      {isClicked && (
        <ul className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
          <li>
            <Link href={`/posts/${post._id}/edit`}>edit</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
