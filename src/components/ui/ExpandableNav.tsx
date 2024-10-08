"use client";

import { Box, useTheme } from "@mui/material";
import Link from "next/link";
import { CSSProperties, MouseEvent } from "react";
import { SlArrowRight } from "react-icons/sl";

// import { useContext } from "react";
// import { CategoryContext } from "../context/CategoryContext";

export default function ExpandableNav({ categories }: any) {
  // console.log({ categories });
  const theme = useTheme();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget as HTMLAnchorElement;
    const li = link.closest("li") as HTMLLIElement;
    const button = li?.querySelector("button") as HTMLButtonElement;
    const ul = li?.querySelector("ul") as HTMLUListElement;
    if (!ul) return;

    // 상중하의 ul 중에서 중간리스트만 높이조정이필요함 (명확한 이유는 알수없음)
    const parentUl = li.closest("ul") as HTMLUListElement;
    const isMiddle = parentUl.className === "middle";

    const isExpanded = link.getAttribute("data-is-expanded") === "true";
    if (isExpanded) {
      link.setAttribute("data-is-expanded", "false");
      ul.style.height = "0"; // 접을 때 높이를 0으로
      button.style.transform = "rotate(0)";

      // 부모 ul 높이 업데이트
      if (parentUl && isMiddle) {
        parentUl.style.height = `${parentUl.scrollHeight - ul.scrollHeight}px`;
      }
    } else {
      link.setAttribute("data-is-expanded", "true");
      ul.style.height = ul.scrollHeight + "px";
      button.style.transform = "rotate(90deg)";

      // 부모 ul 높이 업데이트
      if (parentUl && isMiddle) {
        parentUl.style.height = `${parentUl.scrollHeight + ul.scrollHeight}px`;
      }
    }
  };

  return (
    <Box
      component={"ul"}
      sx={{
        padding: "1rem",
        whiteSpace: "nowrap",
        "& a": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 8px",
          "&:hover": { color: theme.palette.primary.main },
          "& > *": { padding: "8px", cursor: "pointer" },
          "& button": {
            transition: "transform 0.3s",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      {categories?.map((category: any) => (
        <li key={category._id}>
          <Link
            href={`/categories/${category.name}`}
            data-is-expanded="false"
            onClick={handleClick}
          >
            <span>{category.name.replaceAll("-", " ")}</span>

            <button onClick={(e) => e.preventDefault()}>
              <SlArrowRight />
            </button>
          </Link>

          <ul style={ulStyle} className="middle">
            {category.sub1Categories?.map((sub1Category: any) => (
              <li key={sub1Category._id}>
                <Link
                  href={`/categories/${category.name}/${sub1Category.name}`}
                  onClick={handleClick}
                  data-is-expanded="false"
                >
                  <span>{sub1Category.name.replaceAll("-", " ")}</span>

                  <button onClick={(e) => e.preventDefault()}>
                    <SlArrowRight />
                  </button>
                </Link>

                <ul style={ulStyle}>
                  {sub1Category.sub2Categories?.map((sub2Category: any) => (
                    <li key={sub2Category._id}>
                      <Link
                        href={`/categories/${category.name}/${sub1Category.name}/${sub2Category.name}`}
                      >
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
    </Box>
  );
}

// 자바스크립트로 스타일을 동적으로 변경하는 부분은 sx로는 적용되지 않을수있다. 따라서 기본속성으로 적용해야한다.
const ulStyle: CSSProperties = {
  height: "0", // 기본 높이 0
  overflow: "hidden",
  marginLeft: "1rem",
  paddingLeft: "1rem",
  borderLeft: "1px solid #ebebeb",
  transition: "all 0.3s ease-in-out", // height에 애니메이션 적용
};
