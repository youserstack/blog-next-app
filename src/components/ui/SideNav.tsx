"use client";

import Link from "next/link";
import { CSSProperties, MouseEventHandler } from "react";
import { useParams } from "next/navigation";
import { SlArrowRight } from "react-icons/sl";
import { Box } from "@mui/material";
import "./SideNav.scss";

export default function SideNav({ categories }: any) {
  const params: any = useParams(); // 클라이언트에서 요청한 파라미터
  const categorySegments = params.category.map((v: any) => decodeURIComponent(v));

  const handleClick: MouseEventHandler = (e) => {
    // 클릭이벤트가 발생한 리스트아이템 엘리먼트
    const li = e.currentTarget.closest("li") as HTMLElement;
    const button = li.querySelector("button") as HTMLElement;
    const ul = li.querySelector("ul") as HTMLElement;
    if (!(ul instanceof HTMLUListElement)) return;

    const isExpanded = li.getAttribute("data-is-expanded") === "true";
    if (isExpanded) {
      // 펼침 => 접힘
      ul.style.maxHeight = "0";
      button.style.transform = "rotate(0)";
      li.setAttribute("data-is-expanded", "false");
    } else {
      // 접힘 => 펼침
      button.style.transform = "rotate(90deg)";
      ul.style.maxHeight = "100vh";
      li.setAttribute("data-is-expanded", "true");
    }
  };

  const linkStyle = (isLeaf: any) => ({ color: isLeaf ? "#0072f5" : "initial" });
  const subCategoriesStyle: CSSProperties = {
    transition: "opacity 0.15s ease 0s, max-height 0.3s ease-in-out 0s",
    overflow: "hidden",
    marginLeft: "1rem",
    paddingLeft: "1rem",
    borderLeft: "1px solid #ebebeb",
  };

  return (
    <Box
      component={"nav"}
      className="side-nav"
      sx={{
        width: "250px",
        position: "sticky",
        top: "calc(60px + 1rem)",
        height: "calc(100vh - 60px - 2rem)",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        scrollbarColor: "#eaeaea transparent",
        scrollbarGutter: "stable",
      }}
    >
      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* rootCategories */}
        {categories.map((category: any) => {
          const rootCategoryName = category.name;
          const rootCategoryLabel = rootCategoryName.replaceAll("-", " ");
          const rootCategoryPath = `/categories/${rootCategoryName}`;
          const isMatched =
            categorySegments.length >= 1 && rootCategoryName === categorySegments[0];
          const isLeaf = rootCategoryName === categorySegments[categorySegments.length - 1];
          // console.log({ rootCategoryPath });
          return (
            <li
              className="category"
              key={rootCategoryPath}
              data-is-expanded={isMatched ? "true" : "false"}
            >
              <Link href={rootCategoryPath} onClick={handleClick} style={linkStyle(isLeaf)}>
                <span>{rootCategoryLabel}</span>
                <button
                  style={{ transform: isMatched ? "rotate(90deg)" : "initial" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <SlArrowRight />
                </button>
              </Link>

              <ul
                className="sub1-categories"
                style={{ maxHeight: isMatched ? "100vh" : "0", ...subCategoriesStyle }}
              >
                {/* sub1Categories */}
                {category.sub1Categories?.map((sub1Category: any) => {
                  const sub1CategoryName = sub1Category.name;
                  const sub1CategoryLabel = sub1CategoryName.replaceAll("-", " ");
                  const sub1CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}`;
                  const isMatched =
                    categorySegments.length >= 2 && sub1CategoryName === categorySegments[1];
                  const isLeaf = sub1CategoryName === categorySegments[categorySegments.length - 1];
                  // console.log({ sub1CategoryPath });
                  return (
                    <li
                      className="sub1-category"
                      key={sub1CategoryPath}
                      data-is-expanded={isMatched ? "true" : "false"}
                    >
                      <Link href={sub1CategoryPath} onClick={handleClick} style={linkStyle(isLeaf)}>
                        <span>{sub1CategoryLabel}</span>
                        <button
                          style={{ transform: isMatched ? "rotate(90deg)" : "initial" }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <SlArrowRight />
                        </button>
                      </Link>

                      <ul
                        className="sub2-categories"
                        style={{ maxHeight: isMatched ? "100vh" : "0", ...subCategoriesStyle }}
                      >
                        {/* sub2Categories */}
                        {sub1Category.sub2Categories?.map((sub2Category: any) => {
                          const sub2CategoryName = sub2Category.name;
                          const sub2CategoryLabel = sub2CategoryName.replaceAll("-", " ");
                          const sub2CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}/${sub2CategoryName}`;
                          const isLeaf =
                            sub2CategoryName === categorySegments[categorySegments.length - 1];
                          // console.log({ sub2CategoryPath });
                          return (
                            <li className="sub2-category" key={sub2CategoryPath}>
                              <Link href={sub2CategoryPath} style={linkStyle(isLeaf)}>
                                <span>{sub2CategoryLabel}</span>
                              </Link>
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
    </Box>
  );
}
