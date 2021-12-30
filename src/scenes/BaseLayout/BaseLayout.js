import React from 'react'
import classes from './BaseLayout.module.scss'
import Header from '../Header/Header.js'
import { Footer } from '../Footer/Footer'
class BaseLayout extends React.Component{
    constructor(props){
        super(props)
        this.state ={

        }
    }


    render() {
        return(
            <div className={classes.BaseLayout}>
                <Header />
                    <div className="content">
                        {this.props.children}
                    </div>
                <Footer />
            </div>
        )
    }
}

export default BaseLayout