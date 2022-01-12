import React from "react";
import classes from "./Table.module.scss"
import { TableHeader } from "./components/TableHeader/TableHeader";
import { TableRow } from "./components/TableRow/TableRow";
import Img from './test_img.svg'

class Table extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            activeType: 0,
            rotateRate: 0,
            info: [
                { id: 0, vested: "30%", amount: "Need calculate", portion: "2022.01.13"},
                { id: 1, vested: "20%", amount: "Need calculate", portion: "2022.01.14"}, 
                { id: 2, vested: "50%", amount: "Need calculate", portion: "2022.01.15"}
            ]
        }

    }

    render() {
        

        return (
            <>
                <div className={classes.Table}>
                    <TableHeader />
                    <div className={classes.line} />
                    {
                        this.state.info.map((ido, index) => {
                            ido.color = index % 2 ? "linear-gradient(rgb(10, 167, 245, 0.1) 0%, rgb(60, 231, 255, 0.1) 100%)" : "#FFFFFF"
                        return <TableRow {...ido} onClick={(id) => { this.props.onClick(id)}} />
                        } )
                    }
                </div>
            </>

        )
    }
}

export default Table