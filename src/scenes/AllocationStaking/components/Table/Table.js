import { useEffect } from 'react';
import { useState } from 'react';
import ArrowRight from './images/ArrowRight.svg';
import ArrowLeft from './images/ArrowLeft.svg';

import classes from './Table.module.scss'

const splitArrayIntoChunks = (arr, chunkSize) => {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}

const Table = ({ columns, data }) => {
    const paginationOptions = [5, 10, 25, 50, 100];
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSize, setCurrentSize] = useState(5);

    const [subArrays, setSubArrays] = useState(splitArrayIntoChunks([...data], currentSize));

    useEffect(() => {
        setSubArrays(splitArrayIntoChunks([...data], currentSize))
    }, [currentSize]);


    return (<div className={classes.Table}>
        <div className={classes.tableSection}>
            <table>
                <tr className={classes.tableHeader}>
                    {columns.map(column => {
                        return <th>{column.title}</th>
                    })}
                </tr>

                <tr>
                    <td className={classes.dashedLine} colspan={'4'}></td>
                </tr>
                {
                    subArrays[currentPage - 1].map(row => {
                        return (
                            <tr className={classes.infoRow}>
                                {
                                    columns.map(column => {
                                        return <td>{row[column.name]}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }


            </table>
        </div>

        <div className={classes.paginationControl}>
            <div className={classes.sizeSelector}>
                <label>Per page:</label>
                <select
                    value={currentSize}
                    onChange={(e) => { setCurrentSize(e.target.value); setCurrentPage(1) }}
                >
                    {paginationOptions.map(op => {
                        return <option value={op}>{op}</option>
                    })}
                </select>
            </div>


            <div className={classes.navigation}>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <img src={ArrowLeft} />
                </button>
                <div className={classes.counter}>{currentPage + '/' + subArrays.length}</div>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === subArrays.length}
                >
                    <img src={ArrowRight} />
                </button>
            </div>
        </div>
    </div>);
}

export default Table;