import Link from "next/link";
import { cookies } from "next/headers";
import "../../styles/Etc.scss";

export default function Etc() {
  const refreshToken = cookies().get("refreshToken");

  return (
    <div className="etc">
      <ul>
        {refreshToken && (
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
