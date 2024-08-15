"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log({ metric });

    switch (metric.name) {
      case "FCP": {
        // FCP 결과를 처리하는 코드
        break;
      }
      case "LCP": {
        // LCP 결과를 처리하는 코드
        break;
      }
      // 다른 메트릭들도 유사하게 처리
    }
  });

  return null;
}

// "use client";

// import { useReportWebVitals } from "next/web-vitals";

// export function WebVitals() {
//   useReportWebVitals((metric) => {
//     console.log(metric);
//   });
// }
