"use client";

import { Button } from "@mui/material";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";

export default function HorizontalScrollButton({
  targetElement,
  isLeftButton,
  isRightButton,
}: {
  targetElement?: string;
  isLeftButton?: boolean;
  isRightButton?: boolean;
}) {
  return (
    <Button
      onClick={() => {
        if (!targetElement) return;
        const ul = document.querySelector(targetElement) as HTMLUListElement;
        const scrollAmount = window.innerWidth * 0.5; // 뷰포트의 50%

        if (isLeftButton) ul.scrollLeft -= scrollAmount;
        if (isRightButton) ul.scrollLeft += scrollAmount;
      }}
      sx={{ display: { xs: "none", md: "inline-block", fontSize: "30px" } }}
    >
      {isLeftButton && <RiArrowLeftSFill />}
      {isRightButton && <RiArrowRightSFill />}
    </Button>
  );
}
