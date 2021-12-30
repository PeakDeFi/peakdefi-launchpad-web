import React from "react";
import classes from "./DetailTable.module.scss"
import { ControlButton } from "./components/ControlButton/ControlButton";
import { TableRow } from "./components/TableRow/TableRow";

class DetailTable extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            avtiveButton: "sale_info",
            rowInfo: [
                {
                    text: "Project Website",
                    link: {
                        url: "",
                        text: "www.crabada.com"
                    }
                },
                {
                    text: "Number of Registrations",
                    info: "15,290"
                },
                {
                    text: "Vesting",
                    info: "100% TGE"
                },
                {
                    text: "TGE",
                    info: "Nov 13th 2021 at 14:00"
                },
                {
                    text: "Sale Contract Address",
                    link: {
                        url: "",
                        text: "0x51208420EAba25b787008EE856665B2F4c5ed818",
                        isShortText: true
                    }
                }
            ],
            tokenInfo: [
                {
                    text: "Token Name",
                    info: "Crabada"
                },
                {
                    text: "Token Symbol",
                    info: "CRA"
                },
                {
                    text: "Token Decimals",
                    info: "18"
                },
                {
                    text: "Total Supply",
                    info: "1,000,000,000"
                },
                {
                    text: "Token Address",
                    link: {
                        url: "",
                        text: "0x51208420EAba25b787008EE856665B2F4c5ed818",
                        isShortText: true
                    }
                }
            ]
        }
    }

    showTableRows() {
        let arrayToShow = []
        switch (this.state.avtiveButton) {
            case "sale_info":
                arrayToShow = this.state.rowInfo
                break;
            
            case "token_info":
                arrayToShow = this.state.tokenInfo
                break;
        
            default:
                break;
        }

        return arrayToShow.map((info, id) => {
            if (id + 1 == this.state.rowInfo.length){
                info["showLine"] = false
            } else {
                info["showLine"] = true
            }
            return <TableRow key={id} {...info} />
        } )
    }

    render() {
        return ( 
            <div className={classes.detailTable} >
                <div className={classes.controlButtons}>
                    <ControlButton
                        onClick={(ev) => { this.setState({ avtiveButton: "sale_info" }) }}
                        isActive={this.state.avtiveButton === "sale_info"}
                        text="Sale Info"
                    />
                    <ControlButton
                        onClick={(ev) => { this.setState({ avtiveButton: "token_info" }) }}
                        isActive={this.state.avtiveButton === "token_info"}
                        text="Token Info"
                    />
                    <ControlButton
                        onClick={(ev) => { this.setState({ avtiveButton: "about_the_project" }) }}
                        isActive={this.state.avtiveButton === "about_the_project"}
                        text="About the Project"
                    />
                    <ControlButton
                        onClick={(ev) => { this.setState({ avtiveButton: "your_allocations" }) }}
                        isActive={this.state.avtiveButton === "your_allocations"}
                        text="Your Allocations"
                    />
                </div>

                <div className={classes.tableBody}>
                    {this.showTableRows()}
                    
                </div>
            </div>
         )
    }
}

export default DetailTable