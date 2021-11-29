import React, { Component } from "react";
import { recreateOptConfirm, registerOptConfirm, registerOptResend } from "../../api/auth/register";
import controller from "../../utils/controller";
import { numberToTime, SMS_TIMER } from "../../utils/timer";
import Button from "./Button";
import styles from "./RegisterVerifyCode.module.css";
import TextInput from "./TextInput";

export default class RegisterVerifyCode extends Component {

    componentDidMount(){
        this.startCountdown();
    }

    onCode=(t)=>{
        this.props.parent.setState({opt_code:t});
    }

    startCountdown=()=>{

        clearInterval(this.interval);
        this.props.parent.state.show_send_again=false;
        this.props.parent.state.counter = env.SMS_TIMER;
        this.props.parent.state.timer = numberToTime(env.SMS_TIMER);
        this.props.parent.setState(this.props.parent.state);
        this.interval = setInterval(()=>{

            if(this.props.parent.state.counter){
                this.props.parent.state.counter--;
                this.props.parent.state.timer = numberToTime(this.props.parent.state.counter); 
            }else{
                this.props.parent.state.show_send_again=true;
                clearInterval(this.interval);
            }
            this.props.parent.setState(this.props.parent.state);

        },1000);
    }

    onConfirm=()=>{
        let code = this.props.parent.state.opt_code;
        if(code && code.length > 3){

            if(this.props.parent.state.same_mobile){
                recreateOptConfirm(this.props.parent);
            }else{
                registerOptConfirm(this.props.parent);
            }

        }else{
            controller.openNotification("کد تایید نامعتبر می باشد")
        }
    }

    onSendAgain=()=>{
        registerOptResend(this.props.parent);
    }

    onBack=()=>{
        this.props.parent.wcard.style.height="44rem";
        this.props.parent.right_sec.style.padding="2rem";
        this.props.parent.right_sec.style.paddingLeft="14%";
        window.scrollTo(null, 0);
        this.props.parent.loadGCaptcha();
        this.props.parent.setState({page:"base"});
    }

    render(){
        return(
            <div className={styles.con}>

                {
                    this.props.parent.state.same_mobile_message?
                    <div className={styles.top_message}>
                        {this.props.parent.state.same_mobile_message}
                    </div>:null
                }

                <div className={styles.back+" amp_btn"} onClick={this.onBack}>
                    {"بازگشت"}
                    <img className={styles.back_img} src={"/statics/img/login_left_arrow.png"}/>
                </div>

                <div className={styles.title}>{"کد تایید ارسال شده به شماره زیر را وارد نمایید"}</div>

                <div className={styles.mobile}>{this.props.parent.state.mobile}</div>

                <TextInput className={styles.input_con}
                inputClassName={styles.input}
                placeholder={"کد تایید"}
                maxLength={6}
                filters="onlyNum"
                value={this.props.parent.state.opt_code}
                onChange={this.onCode}/>

                {
                    this.props.parent.state.show_send_again?
                    <div className={styles.send_again+" amp_btn"} onClick={this.onSendAgain}>{"ارسال مجدد"}</div>:
                    <div className={styles.timer}>{this.props.parent.state.timer}</div>
                }

                <Button className={styles.btn}
                title={"تایید"}
                loading={this.props.parent.state.opt_confirm_btn_loading}
                onClick={this.onConfirm}/>

            </div>
        )
    }
}