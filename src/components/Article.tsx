import { headers } from "next/headers";
import "../styles/Article.scss";
import Link from "next/link";

export default function Article() {
  const header = headers();
  const pathname = header.get("pathname");
  const slugs: string[] | undefined = pathname?.split("/").slice(1);

  return (
    <article>
      <div className="content">
        {slugs?.map((v: string, i: number) => {
          return (
            <>
              <Link href={""} key={v}>
                {v}
              </Link>
              {i !== slugs.length - 1 && <span>{">"}</span>}
            </>
          );
        })}
      </div>
    </article>
  );
}
