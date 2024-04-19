import { IoIosSearch } from "react-icons/io";
import "../styles/SearchBar.scss";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input type="search" />
      <button>
        <IoIosSearch />
      </button>
    </div>
  );
}
