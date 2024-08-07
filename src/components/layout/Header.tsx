import HeaderScript from "@/components/script/HeaderScript";
import NavBar from "@/components/ui/NavBar";
import MuiAppBar from "./MuiAppBar";

export default async function Header() {
  return (
    // <header
    //   style={{
    //     position: "fixed",
    //     top: "0",
    //     left: "0",
    //     right: "0",
    //     transition: "all 1s",
    //   }}
    // >
    //   <NavBar />
    //   <HeaderScript />
    // </header>

    <MuiAppBar />
  );
}
