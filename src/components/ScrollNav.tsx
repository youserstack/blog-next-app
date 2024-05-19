"use client";

import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import { useParams } from "next/navigation";
import "../styles/ScrollNav.scss";

export default function ScrollNav({ categories }: any) {
  const params = useParams();

  const handleClick: MouseEventHandler = (e) => {
    // e.preventDefault();

    const button = e.currentTarget.querySelector("button") as HTMLElement;
    const nextElementSibling = e.currentTarget.nextElementSibling as HTMLElement;
    if (!nextElementSibling) return;

    if (nextElementSibling.style.display === "block") {
      button.textContent = "unfold";
      nextElementSibling.style.display = "none";
    } else {
      nextElementSibling.style.display = "block";
      button.textContent = "fold";
    }
  };

  useEffect(() => {
    // ROOT_URL/category/sub1Category/sub2Category

    // category가 일치한 경우, sub1-categories를 활성화한다.
    const categories = document.querySelectorAll(".category") as NodeListOf<HTMLElement>; // NodeList (유사배열객체, 컬렉션)
    categories.forEach((category: HTMLElement) => {
      const span = category.querySelector("span") as HTMLElement;
      const button = category.querySelector("button") as HTMLElement;
      const sub1Ul = category.querySelector("ul") as HTMLElement;
      if (span.textContent === params.category[0] && sub1Ul) {
        button.textContent = "fold";
        sub1Ul.style.display = "block"; // 활성화
        sub1Ul.style.border = "1px solid red";

        // sub1Category가 일치한 경우, sub2-categories를 활성화한다.
        const sub1Categories = sub1Ul.querySelectorAll(".sub1-category") as NodeListOf<HTMLElement>;
        sub1Categories.forEach((sub1Category: HTMLElement) => {
          const sub1Span = sub1Category.querySelector("span") as HTMLElement;
          const sub1Button = sub1Category.querySelector("button") as HTMLElement;
          const sub2Ul = sub1Category.querySelector("ul") as HTMLElement;
          if (sub1Span.textContent === params.category[1] && sub2Ul) {
            sub1Button.textContent = "fold";
            sub2Ul.style.display = "block";
            sub2Ul.style.border = "blue";
          }
        });
      }
    });
    // for (let i = 0; i < categories.length; i++) {
    //   const categoryLi = categories[i] as HTMLElement;
    //   const span = categoryLi.querySelector("span") as HTMLElement;
    //   const sub1Ul = categoryLi.querySelector("ul") as HTMLElement;
    //   const currentCategory = span.textContent;
    //   if (currentCategory === params.category[0] && sub1Ul) {
    //     sub1Ul.style.display = "block"; // 활성화
    //     sub1Ul.style.border = "1px solid red";

    //     // 서브1주소가 sub1Category인 경우, sub2-categories를 활성화한다.
    //     const sub1Categories = sub1Ul.querySelectorAll(".sub1-category") as NodeListOf<HTMLElement>;
    //     // const sub1Spans = sub1Ul.querySelectorAll(".sub1-category span") as NodeListOf<HTMLElement>;

    //     sub1Categories.forEach((sub1Category: any) => {
    //       const sub1Span = sub1Category.querySelector("span") as HTMLElement;
    //       const sub2Ul = sub1Category.querySelector("ul") as HTMLElement;
    //       console.log({ sub2Ul });
    //       if (sub1Span.textContent === params.category[1] && sub2Ul) {
    //         sub2Ul.style.display = "block";
    //         sub2Ul.style.border = "blue";
    //       }
    //     });
    //   }
    // }
  }, [params]);

  return (
    <nav className="scroll-nav">
      <ul className="categories">
        {/* root */}
        {categories.map((category: any) => {
          const rootPath = `/categories/${category.name}`;
          return (
            <li className="category" key={rootPath}>
              <Link href={rootPath} onClick={handleClick}>
                <span>{category.name}</span>
                <button onClick={(e) => e.preventDefault()}>unfold</button>
              </Link>

              {/* sub1 */}
              <ul className="sub1-categories">
                {category.sub1Categories?.map((sub1Category: any) => {
                  const sub1Path = `/categories/${category.name}/${sub1Category.name}`;
                  return (
                    <li className="sub1-category" key={sub1Path}>
                      <Link href={sub1Path} onClick={handleClick}>
                        <span>{sub1Category.name}</span>
                        <button onClick={(e) => e.preventDefault()}>unfold</button>
                      </Link>

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
