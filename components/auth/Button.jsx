import React, { Component } from "react";
import Loading from "../index/Loading";
import styles from "./Button.module.css";

export default class Button extends Component {

    onClick=(e)=>{
        if(!this.props.disabled && !this.props.loading){
            this.props.onClick(e);
        }
    }
    
    render(){
        let add_class="";
        if(!this.props.disabled && !this.props.loading){
            add_class="amp_btn";
        }

        return(
            <div className={styles.con+" "+add_class+" "+this.props.className} 
            onClick={this.onClick}>
                
                {
                    this.props.loading?
                    <Loading scale={0.5}/>:
                    this.props.title
                }
                
            </div>
        )
    }
}