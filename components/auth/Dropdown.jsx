import React, { Component } from "react";
import styles from "./Dropdown.module.css";

export default class Dropdown extends Component {
    
    render() {
        return (
            <div className={styles.rDropdown_con+" "+this.props.className}>

                <select className={styles.rDropdown_select} onChange={this.props.onChange}>
                    {
                        this.props.options.map((v,i)=>(
                            <option key={`${i}`} 
                            className={styles.rDropdown_options} 
                            value={v.value}>
                                {v.title}
                            </option>
                        ))
                    }
                </select>

                <div className={styles.rDropdown_title}>{this.props.title}</div>

            </div>
        )
    }
}