import SearchBar from "@/components/SearchBar";
import Etc from "@/components/Etc";
import Nav from "@/components/Nav";
import UserArea from "@/components/UserArea";
import Link from "next/link";
import HeaderStyleController from "@/components/HeaderStyleController";

export default function Header() {
  return (
    <header>
      <div className="header-upper-wrapper">
        <section className="header-upper">
          <h1>
            <Link href={"/"}>blog</Link>
          </h1>
          <SearchBar />
          <UserArea />
        </section>
      </div>
      <div className="header-lower-wrapper">
        <section className="header-lower">
          <Nav />
          {/* <Nav>
            <ServerComponent
            // 클라이언트컴포넌트 안에 서버컴포넌트를 배치하기 위한 children 프로퍼티에 <ServerComponent/> 컴포넌트를 선언한다.
            />
          </Nav> */}
          <Etc />
        </section>
      </div>
      <HeaderStyleController />
    </header>
  );
}
