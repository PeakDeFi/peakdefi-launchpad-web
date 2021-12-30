import React from "react";
import classes from "./Table.module.scss"
import { TableHeader } from "./components/TableHeader/TableHeader";
import { TableRow } from "./components/TableRow/TableRow";
import Img from './test_img.svg'
import { Button } from "./components/ControlButton/ControlButton";
import FilteButton from '../../../../resources/filter_button.svg'
class Table extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            activeType: 0,
            rotateRate: 0,
            idos: [
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: "$0.03",
                    currentPrice: "$0.069",
                    ath: "$0.361",
                    roi: "12.02x",
                    partisipants: "6,020",
                    totalRaised: "$250,000",
                    totalTokenSold: "8,333,333",
                    endAt: "Oct 5th 2021"
                },
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: "$0.03",
                    currentPrice: "$0.069",
                    ath: "$0.361",
                    roi: "12.02x",
                    partisipants: "6,020",
                    totalRaised: "$250,000",
                    totalTokenSold: "8,333,333",
                    endAt: "Oct 5th 2021"
                },
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: "$0.03",
                    currentPrice: "$0.069",
                    ath: "$0.361",
                    roi: "12.02x",
                    partisipants: "6,020",
                    totalRaised: "$250,000",
                    totalTokenSold: "8,333,333",
                    endAt: "Oct 5th 2021"
                },
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: "$0.03",
                    currentPrice: "$0.069",
                    ath: "$0.361",
                    roi: "12.02x",
                    partisipants: "6,020",
                    totalRaised: "$250,000",
                    totalTokenSold: "8,333,333",
                    endAt: "Oct 5th 2021"
                },
            ]
        }

    }

    render() {
        

        return (
            <>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div className={classes.controlButton}>
                        <Button isActive={this.state.activeType === 0 ? true : false} text="Sale Ended At" onClick={(ev) => { this.setState({ activeType: 0 }) }}> </Button>
                        <Button isActive={this.state.activeType === 1 ? true : false} text="ATH IDO ROI" onClick={(ev) => { this.setState({ activeType: 1 })  }}> </Button>
                        <Button isActive={this.state.activeType === 2 ? true : false} text="Total Raised" onClick={(ev) => { this.setState({ activeType: 2 })  }}> </Button>
                    </div>
                    <img
                        style={{transform: `rotate(${this.state.rotateRate}deg)`}}
                        onClick={(ev) => {
                            this.setState({
                            rotateRate: this.state.rotateRate === 0 ? 180 : 0
                            })
                        }}
                        alt=""
                        src={FilteButton}
                    />
                </div>
                <div className={classes.Table}>
                    <TableHeader />
                    <div className={classes.line} />
                    {
                        this.state.idos.map((ido, index) => {
                            ido.color = index % 2 ? "linear-gradient(rgb(10, 167, 245, 0.1) 0%, rgb(60, 231, 255, 0.1) 100%)" : "#FFFFFF"
                        return TableRow(ido)
                        } )
                    }
                </div>
            </>

        )
    }
}

export default Table