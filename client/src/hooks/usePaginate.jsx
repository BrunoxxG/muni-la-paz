import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/actions";

export default function usePaginate() {
  const dispatch = useDispatch();
  const filteredItems = useSelector((state) => state.filteredPublications);
  const currentPage = useSelector((state) => state.currentPage);

  const itemsPerPage = 9;
  const maxIndex = currentPage * itemsPerPage;
  const minIndex = maxIndex - itemsPerPage;
  const publications = filteredItems?.filter((item) => item.check).slice(minIndex, maxIndex); // se envia a GRID
  const numberOfPages = Math.ceil(filteredItems?.length / itemsPerPage) || 1; // para asegurarnos de que el number of pages no sea nunca 0

  function handleOnClick(e) {
    const button = e.target.closest('button');
    if (button) {
      if (button.name === "previous" && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      }
      if (button.name === "next" && currentPage < numberOfPages) {
        dispatch(setCurrentPage(currentPage + 1));
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return {
    publications,
    handleOnClick,
    numberOfPages,
    currentPage,
  };
}
