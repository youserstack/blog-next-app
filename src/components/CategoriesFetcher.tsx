"use client";

import { Context } from "@/components/Provider";
import { useContext, useEffect } from "react";

export default function CategoriesFetcher({ test }: { test: [] }) {
  const { setCategories }: any = useContext(Context);

  // useEffect(() => {
  //   console.log({ test });
  //   // setCategories(test);

  //   let temp = [];
  //   for (let i = 0; i < test.length; i++) {
  //     const rootCategory: any = test[i];
  //     const sub1Categories = rootCategory.sub1Categories;
  //     let root = rootCategory.name;

  //     if (sub1Categories.length > 0) {
  //       console.log({ sub1Categories });

  //       // let sub1 =
  //       for (let i = 0; i < sub1Categories.length; i++) {
  //         const sub1Category = sub1Categories[i];
  //         const sub1 = sub1Category.name;
  //         console.log({ sub1 });
  //       }
  //       // string += '/' +
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // 배열을 생성할 때 사용할 변수
    let resultArray: string[] = [];

    // 주어진 배열을 순회하며 문자열 생성
    for (let i = 0; i < test.length; i++) {
      const rootCategory: any = test[i];
      const sub1Categories = rootCategory.sub1Categories;
      let root = rootCategory.name;
      // root 카테고리를 배열에 추가
      resultArray.push(`/${root}`);

      // sub1Categories가 존재하면 처리
      if (sub1Categories.length > 0) {
        for (let j = 0; j < sub1Categories.length; j++) {
          const sub1Category = sub1Categories[j];
          const sub1 = sub1Category.name;
          // sub1 카테고리를 배열에 추가
          resultArray.push(`/${root}/${sub1}`);

          // sub2Categories가 존재하면 처리
          if (sub1Category.sub2Categories.length > 0) {
            const sub2Category = sub1Category.sub2Categories[0]; // 여기서는 단순 예시로 하나만 처리
            const sub2 = sub2Category.name;
            // sub2 카테고리를 배열에 추가
            resultArray.push(`/${root}/${sub1}/${sub2}`);
          }
        }
      }
    }

    // 생성된 배열을 콘솔에 출력
    console.log(resultArray);

    // 생성된 배열을 상태에 설정
    setCategories(resultArray);
  }, [test]);

  return null;
}
