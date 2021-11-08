import { Carousel } from "antd";
import React, { Component } from "react";
import styles from "./LoginWaiting.module.css";
import Loading from "../index/Loading";
import { numberToTime, SMS_TIMER } from "../../utils/timer";
import { login, loginSendAgain, loginWaiting } from "../../api/auth/login";

export default class LoginWaiting extends Component {

    state={
        slides:sliders_obj,
        slide_title:sliders_obj[0].title,
        slide_text:sliders_obj[0].text,
    }

    componentDidMount(){
        this.startCountdown();
        this.startWaitingRequest();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
        clearInterval(this.waiting_interval);
    }

    startWaitingRequest=()=>{
        loginWaiting(this.props.parent);
    }

    onSendAgain=()=>{
        loginSendAgain(this.props.parent);
    }

    startCountdown=()=>{
        clearInterval(this.interval);
        this.props.parent.state.show_send_again=false;
        this.props.parent.state.counter = SMS_TIMER;
        this.props.parent.state.timer = numberToTime(SMS_TIMER);
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

    onBack=()=>{
        clearInterval(this.waiting_interval);
        this.props.parent.setState({page:"base"});
    }
    
    render(){
        return(
            <div className={styles.wcard} ref={r=>this.wcard=r}>

                <div className={styles.right_sec} ref={r=>this.right_sec=r}>

                    <div className={styles.sec1}>

                        <img className={styles.mc_logo} src={"/statics/img/logo512.png"}/>

                    </div>

                    <div className={styles.back+" amp_btn"} onClick={this.onBack}>
                        {"بازگشت"}
                        <img className={styles.back_img} src={"/statics/img/login_left_arrow.png"}/>
                    </div>

                    <Loading scale={1.5} blue/>

                    <div className={styles.title}>{"لطفا چند لحظه صبر کنید"}</div>

                    <div className={styles.text1}>{"برای تکمیل اهراز هویت به لینک ارسال شده به موبایل خود بروید"}</div>

                    {
                        this.props.parent.state.show_send_again?
                        <div className={styles.send_again+" amp_btn"} onClick={this.onSendAgain}>{"ارسال مجدد"}</div>:
                        <div className={styles.timer}>{this.props.parent.state.timer}</div>
                    }
                    
                </div>

                <div className={styles.left_sec}>

                    <div className={styles.slider_con}>

                        <Carousel autoplay autoplaySpeed={5000} dots={{className:styles.car_dots}}
                        afterChange={this.onCarouselChange}>
                        {
                            this.state.slides.map((v,i)=>(
                                <div className={styles.car_item_con} key={i}>
                                    <img className={styles.car_img} src={v.image}/>
                                </div>
                            ))
                        }
                        </Carousel>

                        <div className={styles.slide_title}>{this.state.slide_title}</div>

                        <div className={styles.slide_text}>{this.state.slide_text}</div>

                    </div>

                </div>

            </div>
        )
    }
}

const sliders_obj = window.env.REGISTER_SLIDERS;