import { Carousel } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { Component } from "react";
import { continueRed, register } from "../../api/auth/register";
import Button from "../../components/auth/Button";
import RegisterRecreate from "../../components/auth/RegisterRecreate";
import RegisterVerifyCode from "../../components/auth/RegisterVerifyCode";
import TextInput from "../../components/auth/TextInput";
import AuthLayout from "../../layouts/AuthLayout";
import controller from "../../utils/controller";
import styles from "./Register.module.css";

export default class Register extends Component {

    state={

        page:"base",//base,opt,recreate

        mobile:"",
        first_name:"",
        last_name:"",
        national_code:"",
        email:"",
        password:"",
        password_conf:"",
        rules_accepted:false,
        g_recaptcha:"",

        trackingId:"",

        mobile_red:false,
        first_name_red:false,
        last_name_red:false,
        national_code_red:false,
        email_red:false,
        password_red:false,
        password_conf_red:false,

        opt_code:"",
        timer:"02:00",
        counter:120,
        same_mobile:false,
        show_send_again:false,
        same_mobile_message:null,
        recreate_confirm_message:null,
        old_user:{
            phone:"?",
            nationalId:"?",
            firstname:"?",
            lastname:"?",
        },

        load_recaptcha:false,

        register_btn_loading:false,
        opt_confirm_btn_loading:false,
        recreate_btn_loading:false,

        slides:sliders_obj,
        slide_title:sliders_obj[0].title,
        slide_text:sliders_obj[0].text,
    }

    componentDidMount(){
        document.title="ثبت نام";

        this.loadGCaptcha();
    }

    loadGCaptcha=()=>{
        setTimeout(()=>{

            grecaptcha.render(document.getElementById("g_example1"), {
                'sitekey' : window.env.G_RECAPTCHA_KEY
            });

        },500)
    }

    onInput=(key, value)=>{
        let o = {};
        o[key]=value;
        this.setState(o);
    }

    onRules=()=>{
        this.setState({rules_accepted:!this.state.rules_accepted});
    }

    onCarouselChange=(i)=>{
        this.setState({
            slide_title:sliders_obj[i].title,
            slide_text:sliders_obj[i].text,
        })
    }

    onRegister=()=>{

        if(continueRed(this)){

            register(this);
        }
    }

    
    render(){
        return(
            <AuthLayout>
                <div className={styles.con}>

                    <img className={styles.mc_logo} src={"/statics/img/logo.png"}/>
                        
                    <div className={styles.wcard} ref={r=>this.wcard=r}>

                        <div className={styles.right_sec} ref={r=>this.right_sec=r}>

                            {
                                this.state.page==="base"?
                                <>
                                <div className={styles.sec1}>

                                    <div className={styles.title}>{"ثبت نام"}</div>

                                    <a href={"/login"} className={styles.login_link}>{"حساب کاربری دارم"}</a>

                                </div>

                                <TextInput className={styles.input}
                                value={this.state.mobile}
                                onChange={t=>this.onInput("mobile",t)}
                                red={this.state.mobile_red}
                                filters="onlyNum"
                                placeholder={"شماره موبایل"}/>

                                <TextInput className={styles.input}
                                value={this.state.first_name}
                                red={this.state.first_name_red}
                                filters="onlyPer"
                                onChange={t=>this.onInput("first_name",t)}
                                placeholder={"نام"}/>

                                <TextInput className={styles.input}
                                value={this.state.last_name}
                                red={this.state.last_name_red}
                                filters="onlyPer"
                                onChange={t=>this.onInput("last_name",t)}
                                placeholder={"نام خانوادگی"}/>

                                <TextInput className={styles.input}
                                value={this.state.national_code}
                                red={this.state.national_code_red}
                                onChange={t=>this.onInput("national_code",t)}
                                filters="onlyNum"
                                placeholder={"کدملی"}/>

                                <TextInput className={styles.input}
                                value={this.state.email}
                                red={this.state.email_red}
                                onChange={t=>this.onInput("email",t)}
                                placeholder={"ایمیل"}/>

                                <TextInput className={styles.input}
                                value={this.state.password}
                                red={this.state.password_red}
                                onChange={t=>this.onInput("password",t)}
                                password={true}
                                type={"password"}
                                placeholder={"رمز عبور"}/>

                                <TextInput className={styles.input}
                                value={this.state.password_conf}
                                red={this.state.password_conf_red}
                                onChange={t=>this.onInput("password_conf",t)}
                                password={true}
                                type={"password"}
                                placeholder={"تکرار رمز عبور"}/>

                                <div className={styles.sec2}>

                                    <Checkbox checked={this.state.rules_accepted}
                                    onChange={this.onRules}/>

                                    <div className={styles.rules_text}>
                                        <a href={"/terms"}>{"قوانین و مقررات "}</a>
                                        {"را مطالعه کردم و می پذیرم."}
                                    </div>

                                </div>

                                <div className={"g-recaptcha "+styles.g_captcha} id="g_example1" render="explicit"
                                style={{minHeight:"78px",marginTop:"0.5rem"}}
                                data-sitekey="6LeW0rwZAAAAAE7Vh-tYpUWy2pQvTcd2bAgHfSec"/>
                                
                                <Button className={styles.btn}
                                title={"ثبت نام"}
                                loading={this.state.register_btn_loading}
                                onClick={this.onRegister}/>

                                {/* <div className={styles.sec3}>
                                    <span>
                                        {"حساب کاربری ندارم."}
                                        <a href={"/register"}>
                                            {"ساخت حساب کاربری جدید "}
                                        </a>
                                    </span>
                                </div> */}
                                </>:null
                            }
                            {
                                this.state.page==="opt"?
                                <RegisterVerifyCode parent={this}
                                ref={r=>this.RegisterVerifyCode=r}/>:null
                            }
                            {
                                this.state.page==="recreate"?
                                <RegisterRecreate parent={this}
                                ref={r=>this.RegisterRecreate=r}/>:null
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
                    
                </div>
            </AuthLayout>
        )
    }
}

const sliders_obj= window.env.REGISTER_SLIDERS;
