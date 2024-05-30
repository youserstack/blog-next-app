"use client";

import { useRouter } from "next/navigation";
import "../../styles/Pagination.scss";

const ITEMS_PER_PAGE = 5;

export default function Pagination({ page, totalCount }: any) {
  const router = useRouter();

  const prev = () => router.push(`?page=${page - 1}`);
  const next = () => router.push(`?page=${page + 1}`);

  return (
    <div className="pagination">
      <button className="prev" onClick={prev} disabled={page === 1}>
        prev
      </button>
      <button
        className="next"
        onClick={next}
        disabled={page === Math.ceil(totalCount / ITEMS_PER_PAGE)}
      >
        next
      </button>
    </div>
  );
}
