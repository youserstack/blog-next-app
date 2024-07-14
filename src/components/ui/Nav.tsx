"use client";

import Link from "next/link";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import { Box, List, ListItem, Paper, SxProps, useTheme } from "@mui/material";
import CategoriesScript from "@/components/script/CategoriesScript";

export default function Nav({ categories }: any) {
  const theme = useTheme();

  return (
    <Box
      component={"nav"}
      className="nav"
      sx={{
        height: "100%",
        "& .category-create-button": { color: theme.palette.primary.contrastText },
      }}
    >
      <List className="categories" sx={rootCategoryListStyle}>
        {categories.map((category: any) => {
          const rootCategoryName = category.name;
          const rootCategoryLabel = rootCategoryName.replaceAll("-", " ");
          const rootCategoryPath = `/categories/${rootCategoryName}`;
          return (
            <ListItem className="category" key={rootCategoryPath} sx={rootCategoryStyle}>
              <Link href={rootCategoryPath}>{rootCategoryLabel}</Link>

              <List className="sub1-categories" sx={sub1CategoryListStyle}>
                <Paper elevation={3}>
                  {category.sub1Categories?.map((sub1Category: any) => {
                    const sub1CategoryName = sub1Category.name;
                    const sub1CategoryLabel = sub1CategoryName.replaceAll("-", " ");
                    const sub1CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}`;
                    return (
                      <ListItem
                        className="sub1-category"
                        key={sub1CategoryPath}
                        sx={sub1CategoryStyle}
                      >
                        <Link href={sub1CategoryPath}>{sub1CategoryLabel}</Link>

                        <List className="sub2-categories" sx={sub2CategoryListStyle}>
                          <Paper elevation={3}>
                            {sub1Category.sub2Categories?.map((sub2Category: any) => {
                              const sub2CategoryName = sub2Category.name;
                              const sub2CategoryLabel = sub2CategoryName.replaceAll("-", " ");
                              const sub2CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}/${sub2CategoryName}`;
                              return (
                                <ListItem
                                  className="sub2-category"
                                  key={sub2CategoryPath}
                                  sx={sub2CategoryStyle}
                                >
                                  <Link href={sub2CategoryPath}>{sub2CategoryLabel}</Link>
                                </ListItem>
                              );
                            })}
                          </Paper>
                        </List>
                      </ListItem>
                    );
                  })}
                </Paper>
              </List>
            </ListItem>
          );
        })}

        <CategoryCreateButton parentCategories={[]} />
      </List>

      <CategoriesScript categories={categories} />
    </Box>
  );
}

// root
const rootCategoryListStyle: SxProps = {
  height: "100%",
  display: "flex",
  padding: "0",
  // "& li": { padding: "0" },
};

const rootCategoryStyle: SxProps = {
  height: "100%",
  position: "relative",
  padding: "0",
  // 호버시 하위카테고리를 활성화한다.
  "&:hover .sub1-categories": { display: "block" },
  // 루트카테고리 리스트아이템 내부의 앵커와 버튼을 설정한다.
  "& > a, & > button": { height: "100%", padding: "0 1rem", display: "flex", alignItems: "center" },
};

// sub1
const sub1CategoryListStyle: SxProps = {
  display: "none",
  position: "absolute",
  top: "100%",
};

const sub1CategoryStyle: SxProps = {
  position: "relative",
  padding: "0",
  // 호버시 하위카테고리를 활성화한다.
  "&:hover .sub2-categories": { display: "block" },
  // 루트카테고리 이외의 리스트아이템 내부의 앵커와 버튼을 설정한다.
  "& a, & button": { height: "100%", padding: "1rem", display: "flex", alignItems: "center" },
};

// sub2
const sub2CategoryListStyle: SxProps = {
  display: "none",
  position: "absolute",
  left: "100%",
  top: "0",
  padding: "0 8px",
};

const sub2CategoryStyle: SxProps = {
  padding: "0",
};
