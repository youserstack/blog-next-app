import Link from "next/link";

export default function Etc({ user }: any) {
  return (
    <div className="etc">
      <ul
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <li>
          <Link href={""}>guestbook</Link>
        </li>
      </ul>
    </div>
  );
}
