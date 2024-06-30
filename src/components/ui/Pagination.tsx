"use client";

import { useRouter } from "next/navigation";
import "./Pagination.scss";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

export default function Pagination({ page, totalCount }: any) {
  const router = useRouter();

  const prev = () => router.push(`?page=${page - 1}`);
  const next = () => router.push(`?page=${page + 1}`);

  const totalPageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const isCurrentPage = (number: number) => (page === number ? "active" : "");

  return (
    <div className="pagination">
      <button className="prev" onClick={prev} disabled={page === 1}>
        prev
      </button>
      <div className="page-numbers">
        {Array.from({ length: totalPageCount }, (v, k) => (
          <Link
            key={k + 1}
            href={`?page=${k + 1}`}
            className={`page-number ${isCurrentPage(k + 1)}`}
          >
            {k + 1}
          </Link>
        ))}
      </div>
      <button
        className="next"
        onClick={next}
        disabled={page >= Math.ceil(totalCount / ITEMS_PER_PAGE)}
      >
        next
      </button>
    </div>
  );
}
