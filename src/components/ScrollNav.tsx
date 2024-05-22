"use client";

import Link from "next/link";
import { MouseEventHandler, createElement, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SlArrowDown, SlArrowRight, SlArrowUp } from "react-icons/sl";
import "../styles/ScrollNav.scss";

export default function ScrollNav(
  { categories }: any // 서버로부터 가져온 카테고리 데이터
) {
  const params = useParams(); // 클라이언트에서 요청한 파라미터

  // 데이터와 파라미터가 변경된 경우, 애로우방향과 서브카테고리활성화를 한다.
  useEffect(() => {
    // category가 일치한 경우, sub1-categories를 활성화한다.
    const categories = document.querySelectorAll(".category") as NodeListOf<HTMLElement>;
    categories.forEach((category: HTMLElement) => {
      const spanElement = category.querySelector("span") as HTMLElement;
      const buttonElement = category.querySelector("button") as HTMLElement;
      const ulElement = category.querySelector("ul") as HTMLElement;
      if (!ulElement) return;
      if (spanElement.textContent === params.category[0]) {
        buttonElement.style.transform = "rotate(90deg)"; // 버튼 아이콘 회전
        ulElement.style.maxHeight = "100vh"; // 서브 카테고리 활성화
        category.setAttribute("data-is-expanded", "true"); // 돔 상태변경

        // sub1Category가 일치한 경우, sub2-categories를 활성화한다.
        const sub1Categories = ulElement.querySelectorAll(
          ".sub1-category"
        ) as NodeListOf<HTMLElement>;
        sub1Categories.forEach((sub1Category: HTMLElement) => {
          const buttonElement = sub1Category.querySelector("button") as HTMLElement;
          const spanElement = sub1Category.querySelector("span") as HTMLElement;
          const ulElement = sub1Category.querySelector("ul") as HTMLElement;
          if (!ulElement) return;
          if (spanElement.textContent === params.category[1]) {
            buttonElement.style.transform = "rotate(90deg)";
            ulElement.style.maxHeight = "100vh";
            sub1Category.setAttribute("data-is-expanded", "true");
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
    <nav className="scroll-nav">
      <ul className="categories">
        {/* root */}
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

              {/* sub1 */}
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
