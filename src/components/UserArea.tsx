import Link from "next/link";
import "../styles/UserArea.scss";

export default function UserArea() {
  return (
    <div className="user-area">
      <Link href={"/auth/signin"}>sign in</Link>
      <Link href={"/auth/signup"}>sign up</Link>
    </div>
  );
}
