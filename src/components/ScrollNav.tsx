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

  // 각각의 애로우 아이콘의 방향을 기억하기 위해서
  // 각각의 리스트 엘리먼트의 데이터 어트리뷰트에 의해서 결정하거나,
  // 각각의 카테고리 패스에 의해서 결정한다.
  const [arrowStates, setArrowStates] = useState<{ [key: string]: boolean }>({});

  // 데이터와 파라미터가 변경된 경우, 애로우방향과 서브카테고리활성화를 한다.
  useEffect(() => {
    // category가 일치한 경우, sub1-categories를 활성화한다.
    const categories = document.querySelectorAll(".category") as NodeListOf<HTMLElement>;
    categories.forEach((category: HTMLElement) => {
      const dataKey = category.getAttribute("data-key") as string; // 애로우 상태설정을 위한 스트링 키
      const span = category.querySelector("span") as HTMLElement;
      const ulElement = category.querySelector("ul") as HTMLElement; // 서브카테고리 엘리먼트
      if (span.textContent === params.category[0] && ulElement) {
        setArrowStates((prev) => ({ ...prev, [dataKey]: true })); // 애로우 상태설정
        ulElement.style.maxHeight = "100vh"; // 서브카테고리 활성화

        // sub1Category가 일치한 경우, sub2-categories를 활성화한다.
        const sub1Categories = ulElement.querySelectorAll(
          ".sub1-category"
        ) as NodeListOf<HTMLElement>;
        sub1Categories.forEach((sub1Category: HTMLElement) => {
          const dataKey = sub1Category.getAttribute("data-key") as string;
          const sub1Span = sub1Category.querySelector("span") as HTMLElement;
          const ulElementInSub1 = sub1Category.querySelector("ul") as HTMLElement;
          if (sub1Span.textContent === params.category[1] && ulElementInSub1) {
            setArrowStates((prev) => ({ ...prev, [dataKey]: true }));
            ulElementInSub1.style.maxHeight = "100vh";
          }
        });
      }
    });
  }, [params, categories]);

  const handleClick: MouseEventHandler = (e) => {
    // 클릭이벤트가 발생한 리스트아이템 엘리먼트
    const liElement = e.currentTarget.closest("li") as HTMLElement;

    // 애로우 스테이트 변경 => 애로우 컴포넌트를 JSX에서 변경한다.
    // 리스트아이템 엘리먼트를 통해서 데이터키를 가져온다.
    const dataKey = liElement.getAttribute("data-key");
    if (!dataKey) return;
    const isExpanded = arrowStates[dataKey];
    setArrowStates((prev) => ({ ...prev, [dataKey]: !isExpanded }));

    // 서브카테고리 엘리먼트 활성화
    const ulElement = liElement.querySelector("ul");
    if (ulElement instanceof HTMLUListElement) {
      if (isExpanded) {
        // unfolding (펼친상태:up) => folding (접힌상태:down)
        ulElement.style.maxHeight = "0";
      } else {
        // folding (접힌상태:down) => unfolding (펼친상태:up)
        ulElement.style.maxHeight = "100vh";
      }
    }
  };

  return (
    <nav className="scroll-nav">
      <ul className="categories">
        {/* root */}
        {categories.map((category: any) => {
          const categoryPath = `/categories/${category.name}`;
          return (
            <li className="category" key={categoryPath} data-key={categoryPath}>
              <Link href={categoryPath} onClick={handleClick}>
                <span>{category.name}</span>
                <button onClick={(e) => e.preventDefault()}>
                  {arrowStates[categoryPath] ? <SlArrowUp /> : <SlArrowDown />}
                </button>
              </Link>

              {/* sub1 */}
              <ul className="sub1-categories">
                {category.sub1Categories?.map((sub1Category: any) => {
                  const categoryPath = `/categories/${category.name}/${sub1Category.name}`;
                  return (
                    <li className="sub1-category" key={categoryPath} data-key={categoryPath}>
                      <Link href={categoryPath} onClick={handleClick}>
                        <span>{sub1Category.name}</span>
                        <button onClick={(e) => e.preventDefault()}>
                          {arrowStates[categoryPath] ? <SlArrowDown /> : <SlArrowRight />}
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
