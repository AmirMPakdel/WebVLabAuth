import React, { Component } from "react";
import styles from "./Loading.module.css";

export default class Loading extends Component {
    
    render(){

        let s={};
        if(this.props.scale){
            s.transform=`scale(${this.props.scale})`;
        }

        let add_class="";
        if(this.props.blue){
            add_class=styles.blue_mode;
        }

        return(
            <div className={styles.con} style={s}>
                <div className={styles.lds_dual_ring+" "+add_class}>

                </div>
            </div>
        )
    }
}