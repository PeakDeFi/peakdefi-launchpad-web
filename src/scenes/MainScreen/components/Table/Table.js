import React from "react";
import classes from "./Table.module.scss"
import { TableHeader } from "./components/TableHeader/TableHeader";
import { TableRow } from "./components/TableRow/TableRow";
import Img from './test_img.svg'
import { Button } from "./components/ControlButton/ControlButton";
import FilteButton from '../../../../resources/filter_button.svg'
class Table extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeType: 3,
            rotateRate: 0,
            sorting: 1,
            idos: [
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: 0.03,
                    currentPrice: 0.069,
                    ath: 0.361,
                    roi: 1.02,
                    partisipants: "6,020",
                    totalRaised: 250000,
                    totalTokenSold: "8,333,333",
                    endAt: 1633436808
                },
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: 0.03,
                    currentPrice: 0.069,
                    ath: 0.361,
                    roi: 132.02,
                    partisipants: "6,020",
                    totalRaised: 250000,
                    totalTokenSold: "8,333,333",
                    endAt: 1633696008
                },
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: 0.03,
                    currentPrice: 0.069,
                    ath: 0.361,
                    roi: 122.02,
                    partisipants: "6,020",
                    totalRaised: 250000,
                    totalTokenSold: "8,333,333",
                    endAt: 1634560008
                },
                {
                    img: Img,
                    symbol: "CLN",
                    name: "Hurricane Swap",
                    idoPrice: 0.03,
                    currentPrice: 0.069,
                    ath: 0.361,
                    roi: 2.02,
                    partisipants: "6,020",
                    totalRaised: 250000,
                    totalTokenSold: "8,333,333",
                    endAt: 1633523208
                },
            ]
        }

    }

    render() {


        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <div className={classes.controlButton}>
                        <Button
                            isActive={this.state.activeType === 0 ? true : false}
                            text="Sale Ended At"
                            onClick={
                                (ev) => {
                                    this.setState(
                                        {
                                            activeType: 0,
                                            idos: this.state.idos.sort((a, b) => this.state.sorting*(a.endAt - b.endAt))
                                        }
                                    );
                                }
                            }
                        />

                        <Button
                            isActive={this.state.activeType === 1 ? true : false}
                            text="ATH IDO ROI"
                            onClick={
                                (ev) => {
                                    this.setState(
                                        {
                                            activeType: 1,
                                            idos: this.state.idos.sort((a, b) =>this.state.sorting*(a.roi-b.roi))
                                        }
                                    );
                                }}
                        />

                        <Button 
                            isActive={this.state.activeType === 2 ? true : false} 
                            text="Total Raised" 
                            onClick={
                                (ev) => {
                                    this.setState(
                                        {
                                            activeType: 2,
                                            idos: this.state.idos.sort((a, b)=>this.state.sorting*(a.totalRaised-b.totalRaised))
                                        }
                                    ) 
                                }
                            }
                        /> 
                    </div>
                    <img
                        style={{ transform: `rotate(${this.state.rotateRate}deg)` }}
                        onClick={(ev) => {
                            this.setState({
                                rotateRate: this.state.rotateRate === 0 ? 180 : 0,
                                sorting: -1*this.state.sorting
                            }, ()=>{
                                switch(this.state.activeType){
                                    case 0:
                                        this.setState(
                                            {
                                                idos: [...this.state.idos].sort((a, b) => this.state.sorting*(a.endAt - b.endAt))
                                            }
                                        );
                                    break;
    
                                    case 1:
                                        
                                        this.setState(
                                            {
                                                idos: [...this.state.idos].sort((a, b) =>this.state.sorting*(a.roi-b.roi))
                                            }
                                        ); 
                                    break;
    
                                    case 2:
                                        this.setState(
                                            {
                                                idos: [...this.state.idos].sort((a, b)=>this.state.sorting*(a.totalRaised-b.totalRaised))
                                            }
                                        ) 
                                    break;
                                }
                            });
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
                        })
                    }
                </div>
            </>

        )
    }
}

export default Table