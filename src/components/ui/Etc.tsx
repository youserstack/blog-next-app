import Link from "next/link";
import "./Etc.scss";

export default function Etc({ user }: any) {
  return (
    <div className="etc">
      <ul>
        {user && (
          <li>
            <Link href={"/posts/create"}>create a post</Link>
          </li>
        )}
        <li>
          <Link href={""}>guestbook</Link>
        </li>
        <li>
          <Link href={""}>tags</Link>
        </li>
      </ul>
    </div>
  );
}
