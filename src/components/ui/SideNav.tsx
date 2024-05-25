"use client";

import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import { useParams } from "next/navigation";
import { SlArrowRight } from "react-icons/sl";
import "../../styles/SideNav.scss";

export default function SideNav(
  { categories }: any // 서버로부터 가져온 카테고리 데이터
) {
  const params: any = useParams(); // 클라이언트에서 요청한 파라미터
  const urlCategories = params.category.map((v: any) => decodeURIComponent(v));

  // 서버로부터 가져온 데이터와 요청 URL 파라미터가 변경된 경우, 돔 엘리먼트와 비교하여 작업을 처리한다.
  useEffect(() => {
    // category level
    const categories = document.querySelectorAll(".side-nav .category") as NodeListOf<HTMLElement>;
    categories.forEach((category: HTMLElement) => {
      const a = category.querySelector("a") as HTMLElement;
      if (urlCategories.length === 1 && a.textContent === urlCategories[0]) {
        a.style.color = "#0072f5";
      }
      const span = category.querySelector("span") as HTMLElement;
      const button = category.querySelector("button") as HTMLElement;
      const ul = category.querySelector("ul") as HTMLElement;
      if (!ul) return console.log(`${category.className} li 태그 내부에 ul 태그가 없습니다.`);
      if (!span) return console.log(`${category.className} li 태그 내부에 span 태그가 없습니다.`);
      if (span.textContent === urlCategories[0]) {
        button.style.transform = "rotate(90deg)";
        ul.style.maxHeight = "100vh";
        category.setAttribute("data-is-expanded", "true");

        // sub1-category level
        const sub1Categories = ul.querySelectorAll(".sub1-category") as NodeListOf<HTMLElement>;
        sub1Categories.forEach((sub1Category: HTMLElement) => {
          const a = sub1Category.querySelector("a") as HTMLElement;
          if (urlCategories.length === 2 && a.textContent === urlCategories[1]) {
            a.style.color = "#0072f5";
          }
          const button = sub1Category.querySelector("button") as HTMLElement;
          const span = sub1Category.querySelector("span") as HTMLElement;
          const ul = sub1Category.querySelector("ul") as HTMLElement;
          if (!ul) return;
          if (span.textContent === urlCategories[1]) {
            button.style.transform = "rotate(90deg)";
            ul.style.maxHeight = "100vh";
            sub1Category.setAttribute("data-is-expanded", "true");

            // sub2-category level
            const sub2Categories = ul.querySelectorAll(".sub2-category") as NodeListOf<HTMLElement>;
            sub2Categories.forEach((sub2Category: HTMLElement) => {
              const a = sub2Category.querySelector("a") as HTMLElement;
              if (urlCategories.length === 3 && a.textContent === urlCategories[2]) {
                a.style.color = "#0072f5";
              }
            });
          }
        });
      }
    });
  }, [params, categories]);

  const handleClick: MouseEventHandler = (e) => {
    // 클릭이벤트가 발생한 리스트아이템 엘리먼트
    const li = e.currentTarget.closest("li") as HTMLElement;
    const isExpanded = li.getAttribute("data-is-expanded") === "true";
    const button = li.querySelector("button") as HTMLElement;
    const ul = li.querySelector("ul") as HTMLElement;
    if (!(ul instanceof HTMLUListElement)) return;

    // 펼침 => 접힘
    if (isExpanded) {
      ul.style.maxHeight = "0";
      button.style.transform = "rotate(0)";
      li.setAttribute("data-is-expanded", "false");
    }
    // 접힘 => 펼침
    else {
      button.style.transform = "rotate(90deg)";
      ul.style.maxHeight = "100vh";
      li.setAttribute("data-is-expanded", "true");
    }
  };

  return (
    <nav className="side-nav">
      <ul className="categories">
        {categories.map((category: any) => {
          const categoryPath = `/categories/${category.name}`;
          return (
            <li className="category" key={categoryPath} data-is-expanded={"false"}>
              <Link href={categoryPath} onClick={handleClick}>
                <span>{category.name}</span>
                <button onClick={(e) => e.preventDefault()}>
                  <SlArrowRight />
                </button>
              </Link>

              <ul className="sub1-categories">
                {category.sub1Categories?.map((sub1Category: any) => {
                  const categoryPath = `/categories/${category.name}/${sub1Category.name}`;
                  return (
                    <li className="sub1-category" key={categoryPath} data-is-expanded={"false"}>
                      <Link href={categoryPath} onClick={handleClick}>
                        <span>{sub1Category.name}</span>
                        <button onClick={(e) => e.preventDefault()}>
                          <SlArrowRight />
                        </button>
                      </Link>

                      {/* {sub1Category.sub2Categories?.length > 0 && (
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
                      )} */}

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
