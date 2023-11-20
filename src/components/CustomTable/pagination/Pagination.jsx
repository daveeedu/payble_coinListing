import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Pagination.css";
import { useDispatch } from "react-redux";


function PaginatedItems({ pagination, total, page, setPagination, itemsPerPage }) {
	const dispatch = useDispatch()
	const [pageCount, setPageCount] = useState(itemsPerPage);

	useEffect(() => {
		setPageCount(Math.ceil(total / itemsPerPage));
	}, [itemsPerPage, total]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {	
		window.scrollTo(0, 100);
		dispatch(setPagination({ ...pagination, page: event.selected + 1 }))
	};

	return (
		<>
			<ReactPaginate
				nextLabel={<AiOutlineArrowRight size={"25px"} className="cursor-pointer"/>}
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel={<AiOutlineArrowLeft size={"25px"} className="cursor-pointer"/>}
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="prev-item"
				previousLinkClassName="page-link"
				nextClassName="next-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				forcePage={page}
				renderOnZeroPageCount={null}
			/>
		</>
	);
}

export default PaginatedItems;
