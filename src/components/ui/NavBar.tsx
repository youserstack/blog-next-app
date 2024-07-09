"use client";

import SearchBar from "@/components/ui/SearchBar";
import Etc from "@/components/ui/Etc";
import Nav from "@/components/ui/Nav";
import Link from "next/link";
import UserArea from "@/components/areas/UserArea";
import AppBar from "@mui/material/AppBar";

export default function NavBar({ user, categories }: any) {
  return (
    <AppBar component="nav">
      <section className="header-upper">
        <h1>
          <Link href={"/"}>blog</Link>
        </h1>
        <SearchBar />
        <UserArea user={user} />
      </section>
      <section className="header-lower">
        <Nav categories={categories} user={user} />
        <Etc user={user} />
      </section>
    </AppBar>
  );
}
