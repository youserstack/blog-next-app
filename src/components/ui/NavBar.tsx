"use client";

import SearchBar from "@/components/ui/SearchBar";
import Etc from "@/components/ui/Etc";
import Nav from "@/components/ui/Nav";
import Link from "next/link";
import UserArea from "@/components/areas/UserArea";
import { AppBar } from "@mui/material";
import { CSSProperties } from "react";
import { SlGlobe } from "react-icons/sl";
// import AppBar from "@mui/material/AppBar";

const sectionStyle: CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  margin: "auto",
  padding: "0 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function NavBar({ user, categories }: any) {
  return (
    <AppBar component="nav">
      <section className="header-upper" style={{ ...sectionStyle, height: "40px" }}>
        <Link href={"/"} style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <SlGlobe size={20} />
        </Link>
        <SearchBar />
        <UserArea user={user} />
      </section>
      <section className="header-lower" style={{ ...sectionStyle, height: "30px" }}>
        <Nav categories={categories} user={user} />
        <Etc user={user} />
      </section>
    </AppBar>
  );
}
