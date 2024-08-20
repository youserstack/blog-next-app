"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // console.log({ metric });
    const { name, value, rating, navigationType } = metric;
    // console.log(name, value, rating, navigationType);

    {
      // 결과를 외부 시스템으로 전송하기
      // const body = JSON.stringify(metric);
      // const url = "https://example.com/analytics";
      // // `navigator.sendBeacon()`을 사용할 수 있으면 사용하고, 그렇지 않으면 `fetch()`를 사용합니다.
      // if (navigator.sendBeacon) {
      //   navigator.sendBeacon(url, body);
      // } else {
      //   fetch(url, { body, method: "POST", keepalive: true });
      // }

      {
        // Google Analytics를 초기화했을 때 `window.gtag`을 사용합니다:
        // 예제: https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
        // window.gtag('event', metric.name, {
        //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // 값은 정수여야 합니다.
        //   event_label: metric.id, // 현재 페이지 로드에 고유한 id
        //   non_interaction: true, // 이 설정은 이탈률에 영향을 주지 않도록 합니다.
        // });
      }
    }

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
