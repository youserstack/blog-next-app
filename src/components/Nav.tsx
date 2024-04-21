import Link from "next/link";
import { navItems } from "@/data/navItems";
import "../styles/Nav.scss";

export default function Nav() {
  return (
    <nav>
      <ul className="nav-items">
        {navItems.map((navItem: any) => (
          <li className="nav-item" key={navItem.label}>
            <Link href={`/blog/${navItem.label}`}>{navItem.label}</Link>

            {/* drop */}
            <ul className="nav-drop-items">
              {navItem.dropItems?.map((dropItem: any) => (
                <li className="nav-drop-item" key={dropItem.label}>
                  <Link href={`/blog/${navItem.label}/${dropItem.label}`}>{dropItem.label}</Link>

                  {/* popup */}
                  <ul className="nav-popup-items">
                    {dropItem.popupItems?.map((popupItem: any) => (
                      <li className="nav-popup-item" key={popupItem.label}>
                        <Link href={`/blog/${navItem.label}/${dropItem.label}/${popupItem.label}`}>
                          {popupItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
