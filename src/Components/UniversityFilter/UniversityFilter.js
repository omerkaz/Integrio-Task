import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./UniversityFilter.css";

function UniversityFilter() {
  const [uniName, setUniName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [alphaTwoCode, setAlphaTwoCode] = useState("")
  const [btnActive, setBtnActive] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // AXİOS-DATA-START
  useEffect(() => {
    btnActive &&
      axios
        .get(`http://universities.hipolabs.com/search?`, {
          params: {
            name: uniName,
            country: countryName,
            alpha_two_code : alphaTwoCode,
          },
        })
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
  }, [uniName, countryName, alphaTwoCode]);
  // AXİOS-DATA-END

  // SEARCH-BUTTON-START
  const refNameValue = useRef(null);
  const refCountryValue = useRef(null);
  const btnClick = (e) => {
    e.preventDefault();
    setUniName(refNameValue.current.value);
    setCountryName(refCountryValue.current.value);
    setBtnActive(true);
  };
  console.log(items);
  // SEARCH-BUTTON-END

  // PaginatedItems-Start
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, i) => (
            <div
              className="border m-1 border-opacity-25 border-light rounded ps-1"
              key={i}
            >
              <h4 className="fs-6 pt-2">{item.name}</h4>
            </div>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
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
    return (
      <div className="d-flex justify-content-center align-items-center">
        Error: {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <>
        <section className="search-sec mt-5">
          <div className="container">
            <form>
              <div className="row mt-5">
                <div className="col-lg-9 offset-lg-3">
                  <div className="row offset-md-2 offset-lg-0">
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                      <input
                        ref={refNameValue}
                        type="text"
                        className="form-control search-slt"
                        placeholder="University Name"
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0 ms-md-3">
                      <input
                        ref={refCountryValue}
                        type="text"
                        className="form-control search-slt"
                        placeholder="Country"
                      />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 p-0 px-1 d-flex mt-3">
                      <button
                        style={{ backgroundColor: "#2096ff", color: "white" }}
                        type="button"
                        className="btn wrn-btn offset-md-3 w-50"
                        onClick={(e) => btnClick(e)}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="search-sec mt-5">
          <div className="container">
            <div className="row">
              <div className="list col-md-8 offset-md-2 p-4 pb-0">
                <PaginatedItems itemsPerPage={15} />
              </div>
            </div>
            <form>
              <div className="row mt-4">
                <div className="col-lg-12 offset-lg-0 d-flex justify-content-center">
                  <div className="row offset-md-2 offset-lg-0">
                    <div className="col-lg-5 col-md-9 col-sm-12 offset-lg-1 p-0 me-lg-1 mb-1 mb-lg-0">
                      <input
                        ref={refNameValue}
                        type="text"
                        className="form-control search-slt"
                        placeholder="Enter University Name"
                      />
                    </div>
                    <div className="col-lg-5 col-md-9 col-sm-12 ms-lg-1 p-0">
                      <input
                        ref={refCountryValue}
                        type="text"
                        className="form-control search-slt"
                        placeholder="Enter Country"
                      />
                    </div>
                    <div className="col-lg-10 col-md-9 col-sm-12 offset-lg-1 p-0 px-1 mt-3 ">
                      <button
                        style={{ backgroundColor: "#2096ff", color: "white" }}
                        type="button"
                        className="btn wrn-btn offset-md-3 w-50"
                        onClick={(e) => btnClick(e)}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default UniversityFilter;
