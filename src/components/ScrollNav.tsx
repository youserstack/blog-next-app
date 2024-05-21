"use client";

import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import "../styles/ScrollNav.scss";

export default function ScrollNav(
  { categories }: any // 서버로부터 가져온 카테고리 데이터
) {
  const params = useParams(); // 클라이언트에서 요청한 파라미터

  // 각각의 애로우 아이콘의 방향을 기억하기 위해서
  // 각각의 리스트 엘리먼트의 데이터 어트리뷰트에 의해서 결정하거나,
  // 각각의 카테고리 패스에 의해서 결정한다.
  const [arrowStates, setArrowStates] = useState<{ [key: string]: boolean }>({});
  // useEffect(() => console.log(arrowStates), [arrowStates]);

  // 데이터와 파라미터가 변경된 경우, 애로우방향과 서브카테고리활성화를 한다.
  useEffect(() => {
    // category/sub1Category/sub2Category

    // category가 일치한 경우, sub1-categories를 활성화한다.
    const categories = document.querySelectorAll(".category") as NodeListOf<HTMLElement>;
    categories.forEach((category: HTMLElement) => {
      const dataKey = category.getAttribute("data-key") as string; // 애로우 상태설정을 위한 스트링 키
      const span = category.querySelector("span") as HTMLElement;
      const ulElement = category.querySelector("ul") as HTMLElement; // 서브카테고리 엘리먼트
      if (span.textContent === params.category[0] && ulElement) {
        // 애로우 상태설정
        // 버튼의 내용을 애로우 아이콘 컴포넌트로 배치하기 위해서는 돔객체를 선택하고 싶었지만, 삽입이 되지 않는다.
        setArrowStates((prev) => ({ ...prev, [dataKey]: true }));
        category.setAttribute("data-arrow-state", "up");
        // 서브카테고리 활성화
        ulElement.style.maxHeight = "100vh";

        // sub1Category가 일치한 경우, sub2-categories를 활성화한다.
        const sub1Categories = ulElement.querySelectorAll(
          ".sub1-category"
        ) as NodeListOf<HTMLElement>;
        sub1Categories.forEach((sub1Category: HTMLElement) => {
          const dataKey = sub1Category.getAttribute("data-key") as string;
          const sub1Span = sub1Category.querySelector("span") as HTMLElement;
          const ulElementInSub1 = sub1Category.querySelector("ul") as HTMLElement;
          if (sub1Span.textContent === params.category[1] && ulElementInSub1) {
            // 애로우 상태설정
            setArrowStates((prev) => ({ ...prev, [dataKey]: true }));
            sub1Category.setAttribute("data-arrow-state", "up");
            // 서브카테고리 활성화
            ulElementInSub1.style.maxHeight = "100vh";
            ulElement.style.maxHeight = "100vh";
          }
        });
      }
    });
  }, [params, categories]);

  const handleClick: MouseEventHandler = (e) => {
    // 버튼을 포함한 리스트아이템 엘리먼트를 선택한다. 그리고 데이터키를 가져온다.
    const liElement = e.currentTarget.closest("li") as HTMLElement;
    const dataKey = liElement.getAttribute("data-key");
    if (!dataKey) return;

    // 애로우 컴포넌트 변경
    // 자식노드에 컴포넌트를 배치할 경우는 스테이트를 통해서 구현하는 것이 권장된다.
    const isExpanded = arrowStates[dataKey];
    setArrowStates((prev) => ({ ...prev, [dataKey]: !isExpanded }));

    // 서브카테고리 엘리먼트 활성화
    const arrowState = liElement.getAttribute("data-arrow-state");
    const ulElement = liElement.querySelector("ul") as HTMLElement;
    if (ulElement instanceof HTMLUListElement) {
      if (arrowState === "down") {
        // folding (접힌상태:down) => unfolding (펼친상태:up)
        liElement.setAttribute("data-arrow-state", "up");
        ulElement.style.maxHeight = "100vh";

        const parentUlElement = liElement.parentElement;
        if (parentUlElement instanceof HTMLUListElement) {
          parentUlElement.style.maxHeight = "100vh";
        }
      } else if (arrowState === "up") {
        // unfolding (펼친상태:up) => folding (접힌상태:down)
        liElement.setAttribute("data-arrow-state", "down");
        ulElement.style.maxHeight = "0";
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
            <li
              className="category"
              key={categoryPath}
              data-key={categoryPath}
              data-arrow-state={"down"}
            >
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
                    <li
                      className="sub1-category"
                      key={categoryPath}
                      data-key={categoryPath}
                      data-arrow-state={"down"}
                    >
                      <Link href={categoryPath} onClick={handleClick}>
                        <span>{sub1Category.name}</span>
                        <button onClick={(e) => e.preventDefault()}>
                          {arrowStates[categoryPath] ? <SlArrowUp /> : <SlArrowDown />}
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
      {/* <h1>{JSON.stringify(arrowStates, null, 4)}</h1> */}
    </nav>
  );
}
