"use client";

import Link from "next/link";
import { navItems } from "@/data/navItems";
import "../styles/Nav.scss";

export default function Nav() {
  const handleClick = () => {
    (document.querySelector("html body .popup-layout") as HTMLElement).style.display = "flex";
  };

  return (
    <nav className="nav">
      <ul className="nav-items">
        {navItems.map((navItem: any) => (
          <li className="nav-item" key={navItem.label}>
            <Link href={`/category/${navItem.label}`}>{navItem.label}</Link>

            {/* drop */}
            <ul className="nav-drop-items">
              {navItem.dropItems?.map((dropItem: any) => (
                <li className="nav-drop-item" key={dropItem.label}>
                  <Link href={`/category/${navItem.label}/${dropItem.label}`}>
                    {dropItem.label}
                  </Link>

                  {/* popup */}
                  {dropItem.popupItems?.length && (
                    <ul className="nav-popup-items">
                      {dropItem.popupItems?.map((popupItem: any) => (
                        <li className="nav-popup-item" key={popupItem.label}>
                          <Link
                            href={`/category/${navItem.label}/${dropItem.label}/${popupItem.label}`}
                          >
                            {popupItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}

        <li className="nav-item category-create">
          <Link href={""} onClick={handleClick}>
            +
          </Link>
        </li>
      </ul>
    </nav>
  );
}
