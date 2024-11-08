import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Breadcrumbs() {
  const params = useParams();
  const segments = params.category as string[];

  return (
    <MuiBreadcrumbs separator="/">
      {segments
        // reduce, slice, map, join, split
        .reduce<string[]>((acc, _, index) => {
          acc.push(segments.slice(0, index + 1).join("/"));
          return acc; // 누적된 배열을 반환
        }, [])
        .map((path) => {
          const segments = path.split("/");
          const lastSegment = segments[segments.length - 1];
          return (
            <Link key={path} href={`/categories/${path}`}>
              {lastSegment}
            </Link>
          );
        })}
    </MuiBreadcrumbs>
  );
}
