import Styles from "./Search.module.css";
import SearchSVG from "../../assets/search.svg";

function Search() {
  return (
    <div className={Styles.search_bar}>
      <input type="text" placeholder="search" />
      <button className={Styles.search}>
        <img src={SearchSVG} alt="search" />
      </button>
    </div>
  );
}

export default Search;
