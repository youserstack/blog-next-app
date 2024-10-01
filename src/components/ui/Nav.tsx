import { Box, Button, List, ListItem, Paper } from "@mui/material";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import Link from "next/link";

export default function Nav({ categories }: any) {
  return (
    <Box
      component="nav"
      className="nav"
      sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
    >
      {/* 루트-카테고리-리스트 */}
      <List className="categories 루트-카테고리-리스트" sx={{ display: "flex" }}>
        {categories.map((category: any) => {
          const rootCategoryName = category.name;
          const rootCategoryLabel = rootCategoryName.replaceAll("-", " ");
          const rootCategoryPath = `/categories/${rootCategoryName}`;
          return (
            <ListItem
              className="category 루트-카테고리-아이템"
              key={rootCategoryPath}
              sx={{
                position: "relative",
                padding: "0",
                "&:hover .sub1-categories": { display: "block" },
                "& li": { padding: "0" },
              }}
            >
              <Link href={rootCategoryPath}>
                <Button color="inherit">{rootCategoryLabel}</Button>
              </Link>

              {/* 서브1-카테고리-리스트 */}
              <List
                className="sub1-categories 서브1-카테고리-리스트"
                sx={{ display: "none", position: "absolute", top: "100%" }}
              >
                <Paper elevation={3}>
                  {category.sub1Categories?.map((sub1Category: any) => {
                    const sub1CategoryName = sub1Category.name;
                    const sub1CategoryLabel = sub1CategoryName.replaceAll("-", " ");
                    const sub1CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}`;
                    return (
                      <ListItem
                        className="sub1-category 서브1-카테고리-아이템"
                        key={sub1CategoryPath}
                        sx={{
                          position: "relative",
                          "&:hover .sub2-categories": { display: "block" },
                          "& a, & button": { padding: "0.5rem 1rem" },
                        }}
                      >
                        <Link href={sub1CategoryPath}>{sub1CategoryLabel}</Link>

                        {/* 서브2-카테고리-리스트 */}
                        <List
                          className="sub2-categories 서브2-카테고리-리스트"
                          sx={{
                            display: "none",
                            position: "absolute",
                            left: "100%",
                            top: "0",
                            padding: "0 8px",
                          }}
                        >
                          <Paper elevation={3}>
                            {sub1Category.sub2Categories?.map((sub2Category: any) => {
                              const sub2CategoryName = sub2Category.name;
                              const sub2CategoryLabel = sub2CategoryName.replaceAll("-", " ");
                              const sub2CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}/${sub2CategoryName}`;
                              return (
                                <ListItem
                                  className="sub2-category 서브2-카테고리-아이템"
                                  key={sub2CategoryPath}
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
    </Box>
  );
}
