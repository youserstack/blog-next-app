"use client";

import Link from "next/link";
import React from "react";
import CategoryCreateButton from "@/components/buttons/CategoryCreateButton";
import { useParams } from "next/navigation";
import "./Breadcrumb.scss";

export default function Breadcrumb() {
  const params = useParams();
  const categorySegments = (params.category as string[]).map((v: any) => decodeURIComponent(v));

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
