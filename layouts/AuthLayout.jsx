import React, { Component } from "react";
import styles from "./AuthLayout.module.css";

export default class AuthLayout extends Component {
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.bg}/>

                {this.props.children}
                
            </div>
        )
    }
}