import { useState, useEffect, useRef } from "react";
import UserDetailModal from "./UserDetailModal";
import ReactPaginate from "react-paginate";
import "./UserFilter.css";

function UserFilter() {
  const [mailFilter, setMailFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [filterValue, setFilterValue] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);

  const mailValueRef = useRef();
  const genderValueRef = useRef();

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=100`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    setFilteredArr(
      items.filter((item) => {
        return (
          (item.gender === genderFilter || genderFilter === "") &&
          item.email.includes(mailFilter)
        );
      })
    );
  }, [mailFilter, genderFilter]);

  console.log("mailfilter ", mailFilter);
  console.log("genderfilter ", genderFilter);
  console.log("filteredarr ", filteredArr);
  console.log("items ", items);

  // PaginatedItems-Start
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, i) => (
            <UserDetailModal key={i} index={i} data={currentItems} />
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      genderValueRef.current.value !== "" || mailValueRef.current.value !== ""
        ? setFilterValue(true)
        : setFilterValue(false);
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(
        filteredArr.length || filterValue
          ? filteredArr.slice(itemOffset, endOffset)
          : items.slice(itemOffset, endOffset)
      );
      setPageCount(
        filteredArr.length || filterValue
          ? Math.ceil(filteredArr.length / itemsPerPage)
          : Math.ceil(items.length / itemsPerPage)
      );
    }, [itemOffset, itemsPerPage, filteredArr]);

    const handlePageClick = (event) => {
      const newOffset =
        filteredArr.length || filterValue
          ? (event.selected * itemsPerPage) % filteredArr.length
          : (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center mb-0"
          activeClassName="active"
        />
      </>
    );
  }
  // PaginatedItems-End

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="text-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-light" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-dark" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center mt-3">
              <form>
                <div className="row">
                  <div className="col-lg-7 col-md-7 col-sm-12 p-0">
                    <input
                      onChange={(e) => {
                        setMailFilter(e.target.value);
                      }}
                      ref={mailValueRef}
                      type="text"
                      className="form-control search-slt"
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-12 p-0 px-md-2">
                    <select
                      onChange={(e) => {
                        setGenderFilter(e.target.value);
                      }}
                      ref={genderValueRef}
                      defaultValue=""
                      className="form-control search-slt"
                      id="exampleFormControlSelect1"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <PaginatedItems itemsPerPage={12} />
          </div>
        </div>
      </>
    );
  }
}

export default UserFilter;
