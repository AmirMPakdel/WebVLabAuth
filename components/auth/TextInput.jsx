import React, { Component } from "react";
import styles from "./TextInput.module.css";
import { onlyNumber, onlyPersianChar, persianWithNum } from "../../utils/inputFilter";

const only_per = "فقط حروف فارسی قابل قبول است";
const only_number = "فقط عدد قابل قبول است";
const per_with_num = "فقط حروف فارسی و عدد قابل قبول است";

/**
 * @typedef Props
 * @property {"onlyNum"|"onlyPer"|"onlyEng"|"perWithNum"} filters
 * @property {boolean} red
 * 
 * @extends Component<Props>
 */
export default class TextInput extends Component {

    state={
        show_password:false,
        error_text:null,
    }
    
    
    onChange=(e)=>{
        let v = e.target.value;
        let filters = this.props.filters;
        if(filters){

            if(filters==="onlyPer"){
                if(onlyPersianChar(v)){
                    this.state.error_text=null;
                    this.props.onChange(v);
                }else{
                    this.setState({error_text:only_per})
                }

            }else if(filters==="onlyNum"){
                if(onlyNumber(v)){
                    this.state.error_text=null;
                    this.props.onChange(v);
                }else{
                    this.setState({error_text:only_number})
                }

            }else if(filters==="perWithNum"){
                if(persianWithNum(v)){
                    this.state.error_text=null;
                    this.props.onChange(v);
                }else{
                    this.setState({error_text:per_with_num})
                }
            }

        }else{

            this.props.onChange(v)
        }
    }

    eye=()=>{
        if(this.state.show_password){
            this.input.type="password"
        }else{
            this.input.type="text"
        }
        this.setState({show_password:!this.state.show_password})
    }

    render() {

        let status_img = null;
        if(this.props.valid){
            status_img = "/statics/img/valid.png";
        }

        let s ={}
        if(this.props.red){
            s.borderColor="rgba(199, 0, 0, 0.5)"
        }

        return (
            <div className={styles.rinput_con+" "+this.props.className} style={s}>
                
                <input className={styles.rinput+" "+this.props.inputClassName} 
                ref={r=>this.input=r}
                onChange={this.onChange} 
                value={this.props.value} 
                type={this.props.type}
                placeholder={this.props.placeholder}
                maxLength={this.props.maxLength}/>

                <img className={styles.rinput_icon} src={status_img}/>

                {
                    this.props.value.length?
                    <div className={styles.rinput_title}>{this.props.placeholder}</div>:null
                }
                
                {
                    this.props.unit?
                    <div className={styles.rinput_unit}>{this.props.unit}</div>:null
                }

                {
                    this.props.error_shown || this.state.error_text?
                    <div className={styles.error_text}>{this.props.error_text || this.state.error_text}</div>:null
                }

                {
                    this.props.password?
                    <>
                    {
                        this.state.show_password?
                        <img className={styles.password_eye} src={"/statics/img/pass_shown.png"} onClick={this.eye}/>
                        :
                        <img className={styles.password_eye} src={"/statics/img/pass_hide.png"} onClick={this.eye}/>
                    }
                    </>:null
                }
                
            </div>
        )
    }
}
