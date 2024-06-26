import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import Link from "next/link";
import React from "react";
import "./Breadcrumb.scss";

export default function Breadcrumb({ categorySegments }: { categorySegments: string[] }) {
  return (
    <div className="breadcrumb">
      {categorySegments?.map((v: string, i: number) => {
        // 요소의 인덱스까지의 모든 요소를 결합하여 경로 생성
        const key = "/" + categorySegments.slice(0, i + 1).join("/");
        return (
          <React.Fragment key={key}>
            <Link href={""}>{v.replaceAll("-", " ")}</Link>
            <span>{">"}</span>
          </React.Fragment>
        );
      })}
      {categorySegments?.length <= 2 && (
        <CategoryCreateButton parentCategories={categorySegments} label="+" />
      )}
    </div>
  );
}
