"use client";

import { Box, useTheme } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CSSProperties, MouseEvent } from "react";
import { SlArrowRight } from "react-icons/sl";

interface Props {
  categories: ICategory[];
  isResponsive?: boolean;
}

export default function ExpandableNav({ categories, isResponsive }: Props) {
  const theme = useTheme();
  const leafColor = theme.palette.primary.main;
  const textColor = theme.palette.text.primary;
  const textHoverColor = theme.palette.primary.light;
  const ulBorderLeftColor = theme.palette.mode === "dark" ? "#ffffff1f" : "#0000001f";

  const params = useParams();
  const categorySegments = (params.category as string[])?.map((v) => decodeURIComponent(v));

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
        minWidth: "300px",
        "& a:hover": { color: textHoverColor + " !important" },
        "& ul": { color: ulBorderLeftColor },
        display: isResponsive ? { xs: "none", md: "block" } : "block",
      }}
    >
      {categories?.map((category: ICategory) => {
        const isMatched =
          categorySegments && categorySegments.length >= 1 && category.name === categorySegments[0];
        const isLeaf =
          categorySegments && category.name === categorySegments[categorySegments.length - 1];
        return (
          <li key={category._id}>
            <Link
              href={`/categories/${category.name}`}
              data-is-expanded={isMatched ? "true" : "false"}
              style={linkStyle(isLeaf, leafColor, textColor)}
              onClick={handleClick}
            >
              <span>{category.name.replaceAll("-", " ")}</span>

              <button onClick={(e) => e.preventDefault()} style={buttonStyle(isMatched)}>
                <SlArrowRight />
              </button>
            </Link>

            <ul style={ulStyle(isMatched)} className="middle">
              {category.sub1Categories?.map((sub1Category) => {
                const isMatched =
                  categorySegments &&
                  categorySegments.length >= 2 &&
                  sub1Category.name === categorySegments[1];
                const isLeaf =
                  categorySegments &&
                  sub1Category.name === categorySegments[categorySegments.length - 1];
                return (
                  <li key={sub1Category._id}>
                    <Link
                      href={`/categories/${category.name}/${sub1Category.name}`}
                      data-is-expanded={isMatched ? "true" : "false"}
                      style={linkStyle(isLeaf, leafColor, textColor)}
                      onClick={handleClick}
                    >
                      <span>{sub1Category.name.replaceAll("-", " ")}</span>

                      <button onClick={(e) => e.preventDefault()} style={buttonStyle(isMatched)}>
                        <SlArrowRight />
                      </button>
                    </Link>

                    <ul style={ulStyle(isMatched)}>
                      {sub1Category.sub2Categories?.map((sub2Category) => {
                        const isLeaf =
                          categorySegments &&
                          sub2Category.name === categorySegments[categorySegments.length - 1];

                        return (
                          <li key={sub2Category._id}>
                            <Link
                              href={`/categories/${category.name}/${sub1Category.name}/${sub2Category.name}`}
                              style={linkStyle(isLeaf, leafColor, textColor)}
                            >
                              <span>{sub2Category.name.replaceAll("-", " ")}</span>
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
    </Box>
  );
}

const linkStyle = (isLeaf: boolean, leafColor: string, textColor: string): CSSProperties => ({
  color: isLeaf ? leafColor : textColor,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 8px",
  cursor: "pointer",
});

const buttonStyle = (isMatched: boolean): CSSProperties => ({
  transform: isMatched ? "rotate(90deg)" : "rotate(0)",
  transition: "transform 0.3s",
  backgroundColor: "transparent",
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

// 자바스크립트로 스타일을 동적으로 변경하는 부분은 sx로는 적용되지 않을수있다. 반드시 기본속성으로 적용해야한다.
const ulStyle = (isMatched: boolean): CSSProperties => ({
  height: isMatched ? "inital" : "0",
  transition: "all 0.3s ease-in-out",
  overflow: "hidden",
  marginLeft: "1rem",
  paddingLeft: "1rem",
  borderLeft: "1px solid",
});
