import React from "react";
import classes from "./IDO.module.scss"
import TestImg from './test_img.svg'
import { IdoBlock } from './components/IdoBlock/IdoBlock'
import Table from "../Table/Table";

class IDO extends React.PureComponent{
    constructor(props) {
        super(props)

        this.state = {
            activeID: 1,
            IDOs: [
                {
                    token: {
                        name: "Platypus",
                        symbol: "PTP",
                        price: "0.0001",
                        img: TestImg
                    },
                    saleInfo: {
                        totalRaised: 1050000,
                        raised: 1000,
                        partisipants: 10,
                        start_date: 1639602566,
                        token_price: 0.01,
                        info: {
                            time_until_launch: null,
                            token_sold: 0,
                            token_distribution: 1000,
                            sale_progres: 73
                        }
                    }
                },
                {
                    token: {
                        name: "Platypus",
                        symbol: "PTP",
                        price: "0.0001",
                        img: TestImg
                    },
                    saleInfo: {
                        totalRaised: 1050000,
                        raised: 1000,
                        partisipants: 10,
                        start_date: 1639602566,
                        token_price: 0.01,
                        info: {
                            time_until_launch: null,
                            token_sold: 0,
                            token_distribution: 1000,
                            sale_progres: 73
                        }
                    }
                },
                {
                    token: {
                        name: "Platypus",
                        symbol: "PTP",
                        price: "0.0001",
                        img: TestImg
                    },
                    saleInfo: {
                        totalRaised: 1050000,
                        raised: 1000,
                        partisipants: 10,
                        start_date: 1639602566,
                        token_price: 0.01,
                        info: {
                            time_until_launch: null,
                            token_sold: 0,
                            token_distribution: 1000,
                            sale_progres: 73
                        }
                    }
                },
                {
                    token: {
                        name: "Platypus",
                        symbol: "PTP",
                        price: "0.0001",
                        img: TestImg
                    },
                    saleInfo: {
                        totalRaised: 1050000,
                        raised: 1000,
                        partisipants: 10,
                        start_date: 1639602566,
                        token_price: 0.01,
                        info: {
                            time_until_launch: null,
                            token_sold: 0,
                            token_distribution: 1000,
                            sale_progres: 73
                        }
                    }
                }
            ]
        }
    }

    menuChange(index) {
        
        this.setState({
            activeID: index
        })

    }


    render() {
        
        return (
            <div style={{marginBottom: "40px"}}>
                <div className={classes.menu}> 
                    <div
                        onClick={() => { this.menuChange(0) }}
                        className={this.state.activeID === 0 ? classes.menuElementActive : classes.menuElement}>
                        Upcoming IDOs
                        <div className={this.state.activeID === 0 ? classes.line : classes.clear}></div>
                    </div>
                    <div
                        onClick={() => { this.menuChange(1) }}
                        className={this.state.activeID === 1 ? classes.menuElementActive : classes.menuElement}> 
                        Completed IDOs
                        <div className={this.state.activeID === 1 ? classes.line : classes.clear}></div>
                    </div>
                </div>

                {
                    this.state.activeID === 0 ? 
                        <div className={classes.idos} >
                            {
                                this.state.IDOs.map(ido_data => {
                                    return IdoBlock(ido_data)
                                } )
                            }
                        </div>
                        :
                        <Table />
                }
            </div>
        )
    }
}

export default IDO