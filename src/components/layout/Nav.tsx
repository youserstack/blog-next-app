import Link from "next/link";
import "../../styles/Nav.scss";
import { navItems } from "@/data/navItems";

export default function Nav() {
  return (
    <nav>
      <ul className="nav-items">
        {navItems.map((item: any) => (
          <li className="nav-item">
            <Link href={""}>{item.label}</Link>

            {/* drop */}
            <ul className="nav-drop-items">
              {item.dropItems?.map((item: any) => (
                <li className="nav-drop-item">
                  <Link href={""}>{item.label}</Link>

                  {/* popup */}
                  <ul className="nav-popup-items">
                    {item.popupItems?.map((item: any) => (
                      <li className="nav-popup-item">
                        <Link href={""}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* <li className="nav-item">
          <Link href={""}>Category</Link>
        </li>
        <li className="nav-item">
          <Link href={""}>Guestbook</Link>
        </li>
        <li className="nav-item">
          <Link href={""}>Tags</Link>
        </li> */}
      </ul>
    </nav>
  );
  // return (
  //   <nav>
  //     <ul className="nav-items">
  //       <li className="nav-item">
  //         <Link href={""}>Category</Link>

  //         {/* drop */}
  //         <ul className="nav-drop-items">
  //           <li className="nav-drop-item">
  //             <Link href={""}>Drop Menu</Link>

  //             {/* popup */}
  //             <ul className="nav-popup-items">
  //               <li className="nav-popup-item">
  //                 <Link href={""}>Popup Menu</Link>
  //               </li>
  //               <li className="nav-popup-item">
  //                 <Link href={""}>Popup Menu</Link>
  //               </li>
  //             </ul>
  //           </li>
  //           <li className="nav-drop-item">
  //             <Link href={""}>Drop Menu</Link>
  //             <ul className="nav-popup-items">
  //               <Link href={""}>Popup Menu</Link>
  //               <Link href={""}>Popup Menu</Link>
  //             </ul>
  //           </li>
  //           <li className="nav-drop-item">
  //             <Link href={""}>Drop Menu</Link>
  //             <ul className="nav-popup-items">
  //               <Link href={""}>Popup Menu</Link>
  //               <Link href={""}>Popup Menu</Link>
  //             </ul>
  //           </li>
  //         </ul>
  //       </li>
  //       <li className="nav-item">
  //         <Link href={""}>Category</Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link href={""}>Guestbook</Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link href={""}>Tags</Link>
  //       </li>
  //     </ul>
  //   </nav>
  // );
}
