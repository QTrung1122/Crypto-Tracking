import SearchBar from "../Search/SearchBar";
import SearchBox from "../Search/SearchBox";

const Portfolio = () => {
  function openSearchBox() {
    const modal = document.querySelector(
      "#search-box",
    ) as HTMLDialogElement | null;
    if (modal != null) {
      modal.showModal();
    }
  }
  function closeSearchBox(moreAction?: Function) {
    const modal = document.querySelector(
      "#search-box",
    ) as HTMLDialogElement | null;
    if (modal != null) {
      modal.close();
    }
    if (moreAction !== undefined) {
      moreAction();
    }
  }
  return (
    <section>
      <SearchBar openSearchBox={openSearchBox} />
      <SearchBox closeSearchBox={closeSearchBox} />
    </section>
  );
};

export default Portfolio;
