import { useEffect } from "react";
import { useState } from "react";
import ArrowRight from "./images/ArrowRight.svg";
import ArrowLeft from "./images/ArrowLeft.svg";

import classes from "./Table.module.scss";

const splitArrayIntoChunks = (arr, chunkSize) => {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
};

const V2Table = ({
  columns,
  data,
  size,
  setSize,
  page,
  setPage,
  totalPages,
}) => {
  const paginationOptions = [5, 10, 25, 50, 100];


  return (
    <div className={classes.Table}>
      <div className={classes.tableSection}>
        <table>
          <tr className={classes.tableHeader}>
            {columns.map((column) => {
              return <th>{column.title}</th>;
            })}
          </tr>

          <tr>
            <td className={classes.dashedLine} colspan={columns.length}></td>
          </tr>

          {data.map((rowInfo) => {
            return (
              <tr className={classes.infoRow}>
                {columns.map((column) => {
                  return <td>{rowInfo[column.name]}</td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>

      <div className={classes.paginationControl}>
        <div className={classes.sizeSelector}>
          <label>Per page:</label>
          <select
            value={size}
            defaultValue={size}
            onChange={(e) => {
              setSize(e.target.value);
              setPage(1);
            }}
          >
            {paginationOptions.map((op) => {
              return <option value={op}>{op}</option>;
            })}
          </select>
        </div>

        <div className={classes.navigation}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <img src={ArrowLeft} />
          </button>
          <div className={classes.counter}>
            {page + "/" + totalPages}
          </div>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <img src={ArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default V2Table;
