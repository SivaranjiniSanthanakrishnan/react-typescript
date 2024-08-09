import React from "react";
import "./App.css";
import { PaginateType } from "./types/Paginate";

export default function Paginate(props: PaginateType) {
  let pages = Array.from({ length: props.endPage }, (_, i) => i + 1);

  return (
    <>
      <div className="container">
        <div className="float-left">
          Total Items per page: &nbsp;
          <select onChange={(e) => props.setItem(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="float-right">
          <button onClick={() => props.paginate(1)}>&lt;&lt;</button>{" "}
          <button onClick={() => props.paginate(props.currentPage - 1)}>
            &lt;
          </button>{" "}
          &nbsp;
          {/* <input type="text" value={props.currentPage} style={{ width: 10 }} /> */}
          <select
            value={props.currentPage}
            onChange={(e) => props.paginate(Number(e.target.value))}>
            {pages.map((p) => (
              <option>{p}</option>
            ))}
          </select>
          &nbsp;
          <button onClick={() => props.paginate(props.currentPage + 1)}>
            &gt;
          </button>
          &nbsp;
          <button onClick={() => props.paginate(props.endPage)}>
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
}
