import React, { Component } from "react";
import { recreateConfirm } from "../../api/auth/register";
import Button from "./Button";
import styles from "./RegisterRecreate.module.css";

export default class RegisterRecreate extends Component {

    onConfirm=()=>{
        recreateConfirm(this.props.parent);
    }

    onCancel=()=>{
        this.props.parent.wcard.style.height="44rem";
        this.props.parent.right_sec.style.padding="2rem";
        this.props.parent.right_sec.style.paddingLeft="14%";
        window.scrollTo(null, 0);
        this.props.parent.loadGCaptcha();
        this.props.parent.setState({page:"base"});
    }
    
    render(){
        let {phone,nationalId,firstname,lastname} = this.props.parent.state.old_user;
        return(
            <div className={styles.con}>

                <div className={styles.title}>{"درصورت ادامه حساب کاربری  قبلی با تمام اطلاعات آن حذف خواهد شد"}</div>

                <div className={styles.top_message1}>
                    {this.props.parent.state.recreate_confirm_message}
                </div>

                <div className={styles.top_message2}>
                    {"مشخصات کاربر قبلی : "+firstname+" "+lastname+" با کد ملی "+nationalId+" و شماره موبایل "+phone}
                </div>

                <Button className={styles.btn}
                title={"تایید"}
                loading={this.props.parent.state.recreate_btn_loading}
                onClick={this.onConfirm}/>

                <div className={styles.cancel} onClick={this.onCancel}>{"انصراف"}</div>

            </div>
        )
    }
}