"use client";

import Link from "next/link";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import { Box, List, ListItem, Paper, useTheme } from "@mui/material";
import CategoriesScript from "@/components/script/CategoriesScript";
import "./Nav.scss";

export default function Nav({ categories }: any) {
  const theme = useTheme();

  return (
    <Box
      component={"nav"}
      className="nav"
      sx={{ "& .category-create-button": { color: theme.palette.primary.contrastText } }}
    >
      <List className="categories">
        {categories.map((category: any) => {
          const rootCategoryName = category.name;
          const rootCategoryLabel = rootCategoryName.replaceAll("-", " ");
          const rootCategoryPath = `/categories/${rootCategoryName}`;
          return (
            <ListItem className="category" key={rootCategoryPath}>
              <Link href={rootCategoryPath}>{rootCategoryLabel}</Link>

              <List className="sub1-categories">
                <Paper elevation={3}>
                  {category.sub1Categories?.map((sub1Category: any) => {
                    const sub1CategoryName = sub1Category.name;
                    const sub1CategoryLabel = sub1CategoryName.replaceAll("-", " ");
                    const sub1CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}`;
                    return (
                      <ListItem className="sub1-category" key={sub1CategoryPath}>
                        <Link href={sub1CategoryPath}>{sub1CategoryLabel}</Link>

                        <List className="sub2-categories">
                          <Paper elevation={3}>
                            {sub1Category.sub2Categories?.map((sub2Category: any) => {
                              const sub2CategoryName = sub2Category.name;
                              const sub2CategoryLabel = sub2CategoryName.replaceAll("-", " ");
                              const sub2CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}/${sub2CategoryName}`;
                              return (
                                <ListItem className="sub2-category" key={sub2CategoryPath}>
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

  // return (
  //   <nav className="nav">
  //     <ul className="categories">
  //       {categories.map((category: any) => {
  //         const rootCategoryName = category.name;
  //         const rootCategoryLabel = rootCategoryName.replaceAll("-", " ");
  //         const rootCategoryPath = `/categories/${rootCategoryName}`;
  //         return (
  //           <li className="category" key={rootCategoryPath}>
  //             <Link href={rootCategoryPath}>{rootCategoryLabel}</Link>

  //             <ul className="sub1-categories">
  //               {category.sub1Categories?.map((sub1Category: any) => {
  //                 const sub1CategoryName = sub1Category.name;
  //                 const sub1CategoryLabel = sub1CategoryName.replaceAll("-", " ");
  //                 const sub1CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}`;
  //                 return (
  //                   <li className="sub1-category" key={sub1CategoryPath}>
  //                     <Link href={sub1CategoryPath}>{sub1CategoryLabel}</Link>

  //                     <ul className="sub2-categories">
  //                       {sub1Category.sub2Categories?.map((sub2Category: any) => {
  //                         const sub2CategoryName = sub2Category.name;
  //                         const sub2CategoryLabel = sub2CategoryName.replaceAll("-", " ");
  //                         const sub2CategoryPath = `/categories/${rootCategoryName}/${sub1CategoryName}/${sub2CategoryName}`;
  //                         return (
  //                           <li className="sub2-category" key={sub2CategoryPath}>
  //                             <Link href={sub2CategoryPath}>{sub2CategoryLabel}</Link>
  //                           </li>
  //                         );
  //                       })}
  //                     </ul>
  //                   </li>
  //                 );
  //               })}
  //             </ul>
  //           </li>
  //         );
  //       })}
  //       {user && (
  //         <li>
  //           <CategoryCreateButton parentCategories={[]} label="+" />
  //         </li>
  //       )}
  //     </ul>

  //     <CategoriesScript categories={categories} />
  //   </nav>
  // );
}
