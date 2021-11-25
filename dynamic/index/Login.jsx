import React, { Component } from "react";
import { login } from "../../api/auth/login";
import Button from "../../components/auth/Button";
import Dropdown from "../../components/auth/Dropdown";
import LoginWaiting from "../../components/auth/LoginWaiting";
import TextInput from "../../components/auth/TextInput";
import AuthLayout from "../../layouts/AuthLayout";
import styles from "./Login.module.css";

export default class Login extends Component {

    state={
        page: "base", //base, waiting
        
        mobile:"",
        mobile_red:false,

        unique_key:"",

        show_send_again:false,
        timer:"02:00",
        counter:120,

        login_loading:false,
    }

    componentDidMount(){
        document.title="ورود";
        
        //fill_fakedata(this);
    }

    onMobile=(t)=>{
        this.setState({mobile:t});
    }

    onType=(t)=>{
        this.setState({type:t});
    }

    onLogin=()=>{
        if(this.state.mobile.length!=11){
            this.setState({mobile_red:true});
        }else{
            login(this);
        }
    }
    
    render(){
        return(
            <AuthLayout>

                <div className={styles.con}>

                    {
                        this.state.page==="base"?
                        <>
                        <div className={styles.wcard}>

                            <img className={styles.mc_logo} src={"/statics/img/logo512.png"}/>

                            <div className={styles.mc_title}>{"ورود به موبایل کانکت"}</div>

                            <TextInput className={styles.input}
                            onChange={this.onMobile}
                            value={this.state.mobile}
                            placeholder="شماره موبایل"
                            red={this.state.mobile_red}
                            filters={"onlyNum"}
                            maxLength={11}/>

                            {/* <Dropdown className={styles.input}
                            onChange={this.onType}
                            title={"انتخاب شیوه احراز هویت"}
                            options={types}/> */}

                            <Button className={styles.btn}
                            onClick={this.onLogin}
                            loading={this.state.login_loading}
                            title={"ورود"}/>

                            <div className={styles.sec1}>
                                <span>
                                {"حساب کاربری ندارم."}
                                <a href={"/register"}>
                                    {"ساخت حساب کاربری جدید "}
                                </a>
                                </span>
                            </div>

                        </div>

                        <div className={styles.sec2}>

                            <a href="/aboutUs">{"درباره ما"}</a>

                            <div>|</div>

                            <a href="/help">{"راهنمای استفاده"}</a>

                        </div>
                    </>:null
                    }
                    {
                        this.state.page==="waiting"?
                        <LoginWaiting parent={this}
                        ref={r=>this.LoginWaiting=r}/>:null
                    }
                    

                </div>

            </AuthLayout>
        )
    }
}

function fill_fakedata(c){

    c.setState({
        mobile: "09981547091"
    })
}

const types = [
    {
        title:"موبایل کانکت",
        value:"1"
    },
    {
        title:"اس ام اس لینک",
        value:"2"
    },
    {
        title:"اپلیکیشن",
        value:"3"
    },
]