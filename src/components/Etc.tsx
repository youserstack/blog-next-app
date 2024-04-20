import Link from "next/link";
import "../styles/Etc.scss";

export default function Etc() {
  return (
    <div className="etc">
      <ul>
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
