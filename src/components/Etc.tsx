import Link from "next/link";
import "../styles/Etc.scss";
import { cookies } from "next/headers";

export default function Etc() {
  const refreshToken = cookies().get("refreshToken");

  return (
    <div className="etc">
      <ul>
        {refreshToken && (
          <li>
            <Link href={"/post/create"}>create a post</Link>
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
