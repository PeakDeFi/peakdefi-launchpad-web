import { useEffect, useState } from 'react';
import { TiFilter } from 'react-icons/ti';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import classes from './RefereesTable.module.scss'
import { useWeb3React } from '@web3-react/core';
import ButtonBlue from './components/ButtonBlue/ButtonBlue';
import AddressFilter from './components/AddressFilter/AddressFilter';
import DateFilter from './components/DateFilter/DateFilter';
import ComissionFilter from './components/ComissionFilter/ComissionFilter';
import CopyIcon from './images/Copy.svg';
import Table from '../Table/Table';
import { TableHeader } from '../../../IdoDetail/components/Table/components/TableHeader/TableHeader';
import TableRow from '../../../IdoDetail/components/Table/components/TableRow/TableRow';

import ArrowRight from './images/ArrowRight.svg';
import ArrowLeft from './images/ArrowLeft.svg';
import HeaderIcon from './images/HeaderIcon.svg';
import { getReferees } from '../../API/referal';
import { toast } from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const RefereesTable = () => {
    const [filtersCount, setFiltersCount] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    const { account } = useWeb3React();

    //filters state
    const [filterAddresses, setFilterAddresses] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [comissionFrom, setComissionFrom] = useState(0);
    const [comissionTo, setComissionTo] = useState(0);


    //pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const pageCountOptions = [5, 10, 25, 50];
    const [maxPageCount, setMaxPageCount] = useState(10);

    const columns = [
        { title: 'Address', name: 'address', width: '1fr' },
        { title: 'Timestamp', name: 'date', width: '1fr' },
        { title: 'Commission', name: 'commission', width: '1fr' }
    ]

    const [values, setValues] = useState([
        { address: "0xASDASDASDASDAS", date: new Date().toLocaleDateString('en-GB'), commission: '5%' },
        { address: "0xASDASDASDASDAS", date: new Date().toLocaleDateString('en-GB'), commission: '5%' },
        { address: "0xASDASDASDASDAS", date: new Date().toLocaleDateString('en-GB'), commission: '5%' },
        { address: "0xASDASDASDASDAS", date: new Date().toLocaleDateString('en-GB'), commission: '5%' },
        { address: "0xASDASDASDASDAS", date: new Date().toLocaleDateString('en-GB'), commission: '5%' },
    ])

    const clearAllFilters = () => {
        setFilterAddresses([]);
        setStartDate(undefined);
        setEndDate(undefined);
        setComissionFrom(0);
        setComissionTo(0);
        setFiltersCount(0);
    }


    const onPageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected + 1);
    }

    const createLink = () => {
        navigator.clipboard.writeText(window.location.host + "?referrer_wallet_address=" + account);

        toast.info('Referral link copied to clipboard', {
            icon: ({ theme, type }) => <ContentCopyIcon style={{ color: 'rgb(53, 150, 216)' }} />,
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    useEffect(() => {
        let filtersCount = 0;
        if (filterAddresses.length > 0)
            filtersCount++;
        if (!!startDate || !!endDate)
            filtersCount++;
        if (comissionFrom > 0 || comissionTo > 0)
            filtersCount++;

        setFiltersCount(filtersCount);
        getReferees(account,
            {
                referrals: filterAddresses,
                dateFrom: !!startDate ? Math.floor(startDate.getTime() / 1000) : undefined,
                dateTo: !!endDate ? Math.floor(endDate.getTime() / 1000) : undefined,
                comissionFrom: comissionFrom,
                comissionTo: comissionTo,
                page: currentPage,
                perPage: rowsPerPage
            }
        ).then((response) => {
            setMaxPageCount(response.data.page_numbers);
            debugger;
            setValues(response.data.referrals_deposit.map((e) => {
                return {
                    address: e[0],
                    commission: e[2],
                    date: new Date(e[3] * 1000).toLocaleDateString('en-GB')
                }
            }))
        })

        if (account) {
        }
    }, [currentPage, rowsPerPage, account, startDate, endDate, comissionFrom, comissionTo, filterAddresses])

    return (<section className={classes.RefereesTable}>

        <header>
            <div className={classes.title}>
                <img src={HeaderIcon} />
                <h1>Referral rewards</h1>
            </div>

            <div className={classes.filterControls}>
                <button className={classes.clearAll} onClick={clearAllFilters}>Clear All</button>

                <ButtonBlue
                    className={showFilters ? classes.filterButtonActive : classes.filterButton}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <TiFilter className={classes.filterIcon} />
                    <div className={classes.text}>Filters</div>
                    {
                        filtersCount > 0 &&
                        <div className={classes.filterCounter}>
                            {filtersCount}
                        </div>
                    }
                </ButtonBlue>
            </div>
        </header>

        <main>
            <div className={showFilters ? classes.filters : classes.collapsedFilters}>
                <div className={classes.filterSection}>
                    <h1>Filter by Address</h1>
                    <AddressFilter
                        filterAddresses={filterAddresses}
                        setFilterAddresses={setFilterAddresses}
                    />
                </div>

                <div className={classes.filterSection}>
                    <h1>Date</h1>
                    <DateFilter
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>

                {/* <div className={classes.filterSection}>
                    <h1>Commission</h1>
                    <ComissionFilter
                        setComissionFrom={setComissionFrom}
                        setComissionTo={setComissionTo}
                        comissionFrom={comissionFrom}
                        comissionTo={comissionTo}
                    />
                </div> */}
            </div>
            <div className={classes.Table}>
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
                            values.map(row => {
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

                        {
                            values.length === 0 && account &&
                            <tr className={classes.noReferees}>
                                <td colspan={columns.length}>
                                    <h1>There are currently no entries.</h1>
                                    <h1>Invite your friends now to earn PEAK:</h1>
                                    <div className={classes.referralLink}>
                                        <h1>Your referral: </h1>
                                        <div className={classes.linkInput}>
                                            <div className={classes.link}>{window.location.host + "....." + account.slice(account.length - 10, account.length)}</div>
                                            <img style={{ "width": "15px", "height": "24px" }} src={CopyIcon} onClick={createLink} />
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        }

                        {
                            values.length === 0 && !account &&
                            <tr className={classes.noData}>
                                <td colSpan={columns.length}>Please connect your wallet</td>
                            </tr>
                        }


                    </table>
                </div>
                {values.length !== 0 &&
                    <div className={classes.paginationControl}>
                        <div className={classes.sizeSelector}>
                            <label>Per page:</label>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => { setRowsPerPage(e.target.value); setCurrentPage(1) }}
                            >
                                {pageCountOptions.map(op => {
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
                            <div className={classes.counter}>{currentPage + '/' + maxPageCount}</div>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === maxPageCount}
                            >
                                <img src={ArrowRight} />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </main>


        <div className={classes.separator} />
    </section>);
}

export default RefereesTable;