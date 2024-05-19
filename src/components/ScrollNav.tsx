"use client";

import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import { useParams } from "next/navigation";
import "../styles/ScrollNav.scss";

export default function ScrollNav({ categories }: any) {
  const params = useParams();

  const handleClickCategory: MouseEventHandler = (e) => {
    const nextElementSibling = e.currentTarget.nextElementSibling as HTMLElement;
    const button = e.currentTarget.querySelector("button") as HTMLElement;
    if (nextElementSibling.style.display === "block") {
      nextElementSibling.style.display = "none";
      button.textContent = "unfold";
    } else {
      nextElementSibling.style.display = "block";
      button.textContent = "fold";
    }
  };

  useEffect(() => {
    const categories = document.querySelectorAll(".category");
    console.log({ categories });
  }, []);

  return (
    <nav className="scroll-nav">
      <ul className="categories">
        {/* root */}
        {categories.map((category: any) => {
          const rootPath = `/categories/${category.name}`;
          return (
            <li className="category" key={rootPath}>
              <Link href={rootPath} onClick={handleClickCategory}>
                {category.name}
                <button onClick={(e) => e.preventDefault()}>unfold</button>
              </Link>

              {/* sub1 */}
              <ul className="sub1-categories">
                {category.sub1Categories?.map((sub1Category: any) => {
                  const sub1Path = `/categories/${category.name}/${sub1Category.name}`;
                  return (
                    <li className="sub1-category" key={sub1Path}>
                      <Link href={sub1Path}>{sub1Category.name}</Link>

                      {/* sub2 */}
                      {sub1Category.sub2Categories?.length > 0 && (
                        <ul className="sub2-categories">
                          {sub1Category.sub2Categories?.map((sub2Category: any) => {
                            const sub2Path = `/categories/${category.name}/${sub1Category.name}/${sub2Category.name}`;
                            return (
                              <li className="sub2-category" key={sub2Path}>
                                <Link href={sub2Path}>{sub2Category.name}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
