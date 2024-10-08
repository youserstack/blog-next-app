"use client";

import Link from "next/link";
import { CSSProperties, MouseEvent } from "react";
import { SlArrowRight } from "react-icons/sl";

// import { useContext } from "react";
// import { CategoryContext } from "../context/CategoryContext";

export default function ExpandableNav({ categories }: any) {
  console.log({ categories });

  const handleClick1 = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const link = e.currentTarget as HTMLAnchorElement;
    const li = link.closest("li") as HTMLLIElement;
    const ul = li?.querySelector("ul") as HTMLUListElement;
    if (!ul) return;

    const isExpanded = link.getAttribute("data-is-expanded") === "true";
    if (isExpanded) {
      link.setAttribute("data-is-expanded", "false");
      ul.style.height = "0"; // 접을 때 높이를 0으로
    } else {
      link.setAttribute("data-is-expanded", "true");
      ul.style.height = ul.scrollHeight + "px";
    }
  };

  const handleClick2 = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const link = e.currentTarget as HTMLAnchorElement;
    const li = link.closest("li") as HTMLLIElement;
    const ul = li?.querySelector("ul") as HTMLUListElement;
    if (!ul) return;

    const parentUl = li.closest("ul");

    const isExpanded = link.getAttribute("data-is-expanded") === "true";
    if (isExpanded) {
      link.setAttribute("data-is-expanded", "false");
      ul.style.height = "0"; // 접을 때 높이를 0으로

      // 부모 ul 높이 업데이트
      if (parentUl) {
        parentUl.style.height = `${parentUl.scrollHeight - ul.scrollHeight}px`;
      }
    } else {
      link.setAttribute("data-is-expanded", "true");
      ul.style.height = ul.scrollHeight + "px";
      // console.log(ul, ul.style.height);

      // 부모 ul 높이 업데이트
      if (parentUl) {
        parentUl.style.height = `${parentUl.scrollHeight + ul.scrollHeight}px`;
      }
    }
  };

  // const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();

  //   const link = e.currentTarget as HTMLAnchorElement;
  //   const li = link.closest("li"); // 클릭된 li 요소
  //   const isExpanded = link.getAttribute("data-is-expanded") === "true";

  //   // 클릭된 li의 자식 ul 찾기
  //   const ul = li?.querySelector("ul") as HTMLUListElement;
  //   if (!ul) return;

  //   // 클릭된 li의 부모 ul 찾기 (높이를 동적으로 업데이트하기 위함)
  //   const parentUl = li.closest("ul");

  //   if (isExpanded) {
  //     // 접을 때
  //     link.setAttribute("data-is-expanded", "false");
  //     ul.style.height = `${ul.scrollHeight}px`; // 먼저 현재 scrollHeight로 설정
  //     requestAnimationFrame(() => {
  //       ul.style.height = "0"; // 0으로 줄이면서 애니메이션
  //     });

  //     // 부모 ul 높이 업데이트
  //     if (parentUl) {
  //       parentUl.style.height = `${parentUl.scrollHeight - ul.scrollHeight}px`;
  //     }
  //   } else {
  //     // 펼칠 때
  //     link.setAttribute("data-is-expanded", "true");
  //     ul.style.height = "0"; // 0으로 시작
  //     requestAnimationFrame(() => {
  //       ul.style.height = `${ul.scrollHeight}px`; // 자식 ul의 높이로 설정하여 애니메이션
  //     });

  //     // 부모 ul 높이 업데이트
  //     if (parentUl) {
  //       parentUl.style.height = `${parentUl.scrollHeight + ul.scrollHeight}px`;
  //     }
  //   }
  // };

  return (
    <div
      style={{
        padding: "1rem",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ul style={{ padding: "1rem", border: "2px solid green" }}>
        {categories?.map((category: any) => (
          <li key={category._id}>
            <Link
              href={""}
              style={linkStyle}
              // href={`/categories/${category.name}`}
              onClick={handleClick1}
              data-is-expanded="false"
            >
              <span>{category.name.replaceAll("-", " ")}</span>

              <button>
                <SlArrowRight />
              </button>
            </Link>

            <ul style={{ ...ulStyle }}>
              {category.sub1Categories?.map((sub1Category: any) => (
                <li key={sub1Category._id}>
                  <Link href={""} style={linkStyle} onClick={handleClick2} data-is-expanded="false">
                    <span>{sub1Category.name.replaceAll("-", " ")}</span>

                    <button>
                      <SlArrowRight />
                    </button>
                  </Link>

                  <ul
                    style={{
                      ...ulStyle,
                    }}
                  >
                    {sub1Category.sub2Categories?.map((sub2Category: any) => (
                      <li key={sub2Category._id}>
                        <Link href={""} style={linkStyle}>
                          <span>{sub2Category.name.replaceAll("-", " ")}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

const linkStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 8px",
  border: "1px solid",
};

const ulStyle: CSSProperties = {
  // maxHeight: "0", // 기본 최대 높이 0
  height: "0", // 기본 높이 0
  overflow: "hidden",
  marginLeft: "1rem",
  paddingLeft: "1rem",
  borderLeft: "1px solid #ebebeb",
  transition: "all 0.3s ease-in-out", // height에 애니메이션 적용
};
