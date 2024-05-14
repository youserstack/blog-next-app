"use client";

import CategoryCreateButton from "@/components/CategoryCreateButton";
import Link from "next/link";

export default function NavItem({ category }: any) {
  return (
    <li className="nav-item" key={category._id} accessKey={category._id}>
      <Link href={"/categories/test"}>{category.name}</Link>

      {/* drop */}
      <ul className="nav-drop-items">
        {/* <CategoryCreateButton parentCategories={category._id} /> */}

        {/* {category.categories?.map((category: any) => (
          <li key={category._id}>
            <Link href={""}>{category.name}</Link>
          </li>
        ))} */}
      </ul>
    </li>
  );
  // return (
  //   <li className="nav-item" key={category._id} accessKey={category._id}>
  //     <Link href={"/categories/test"}>{category.name}</Link>

  //     {/* drop */}
  //     <ul className="nav-drop-items">
  //       <li>
  //         <Link href={""}>+</Link>
  //       </li>
  //       {category.categories?.map((category: any) => (
  //         <li key={category._id}>
  //           <Link href={""}>{category.name}</Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </li>
  // );
}
